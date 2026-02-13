import type { Request, Response } from "express";
import { PaymentType } from "@prisma/client";
import { prisma } from "../../lib/prisma";

function parseStoreId(req: Request) {
  const storeIdRaw = req.query.storeId ?? req.body.storeId;
  const storeId = Number(storeIdRaw);
  if (!storeIdRaw || Number.isNaN(storeId) || storeId <= 0) return null;
  return storeId;
}

function parseId(val: unknown) {
  const n = Number(val);
  if (Number.isNaN(n) || n <= 0) return null;
  return n;
}

function round3(n: number) {
  return Math.round(n * 1000) / 1000;
}
function round2(n: number) {
  return Math.round(n * 100) / 100;
}

async function generateReceiptNo(tx: typeof prisma, storeId: number) {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const prefix = `${y}-${m}-${d}`;

  const countToday = await tx.sale.count({
    where: {
      storeId,
      createdAt: {
        gte: new Date(`${prefix}T00:00:00.000Z`),
        lt: new Date(`${prefix}T23:59:59.999Z`),
      },
    },
  });

  const seq = String(countToday + 1).padStart(6, "0");
  return `${prefix}-${seq}`;
}


export async function createSale(req: Request, res: Response) {
  try {
    const storeId = parseStoreId(req);
    if (!storeId) return res.status(400).json({ error: "storeId is required." });

    const cashierId = parseId(req.body.cashierId);
    if (!cashierId) return res.status(400).json({ error: "cashierId is required." });

    const paymentType = req.body.paymentType as PaymentType;
    if (!paymentType || !["cash", "card", "mixed", "credit"].includes(paymentType)) {
      return res.status(400).json({ error: "paymentType must be cash|card|mixed|credit." });
    }

    const discount = round2(Number(req.body.discount ?? 0));
    if (Number.isNaN(discount) || discount < 0) return res.status(400).json({ error: "discount must be >= 0." });

    const paidAmountInput = req.body.paidAmount;
    const paidAmountRaw = paidAmountInput === undefined ? null : round2(Number(paidAmountInput));
    if (paidAmountRaw !== null && (Number.isNaN(paidAmountRaw) || paidAmountRaw < 0)) {
      return res.status(400).json({ error: "paidAmount must be >= 0." });
    }

    const customerId = req.body.customerId ? parseId(req.body.customerId) : null;

    const items = Array.isArray(req.body.items) ? req.body.items : [];
    if (items.length === 0) return res.status(400).json({ error: "items must be a non-empty array." });

    // item validate
    const normalizedItems = items.map((it: any) => {
      const productId = parseId(it.productId);
      const qty = Number(it.qty);
      const unitPrice = Number(it.unitPrice);

      if (!productId) throw new Error("Invalid productId in items.");
      if (Number.isNaN(qty) || qty <= 0) throw new Error("Invalid qty in items.");
      if (Number.isNaN(unitPrice) || unitPrice < 0) throw new Error("Invalid unitPrice in items.");

      return {
        productId,
        qty: round3(qty),
        unitPrice: round2(unitPrice),
      };
    });

    const result = await prisma.$transaction(async (tx) => {
      // cashier belongs to store?
      const cashier = await tx.user.findFirst({ where: { id: cashierId, storeId }, select: { id: true } });
      if (!cashier) throw new Error("Cashier not found for this store.");

      // customer optional (faqat berilgan bo‘lsa tekshiramiz)
      if (customerId) {
        const c = await tx.customer.findFirst({ where: { id: customerId, storeId }, select: { id: true } });
        if (!c) throw new Error("Customer not found for this store.");
      }

      // inventory check + compute subtotal
      let subtotal = 0;

      // NOTE: bu yerda lock darajasi Prisma’da cheklangan, lekin MVP uchun yetarli.
      for (const it of normalizedItems) {
        const inv = await tx.inventory.findUnique({
          where: { storeId_productId: { storeId, productId: it.productId } },
          select: { id: true, qty: true },
        });

        if (!inv) throw new Error(`Inventory not found for productId=${it.productId}`);

        const available = Number(inv.qty);
        if (available < it.qty) {
          throw new Error(`Ombor yetarli emas: productId=${it.productId}, bor=${available}, kerak=${it.qty}`);
        }

        subtotal += it.qty * it.unitPrice;
      }

      subtotal = round2(subtotal);
      const total = round2(subtotal - discount);
      if (total < 0) throw new Error("total cannot be negative (discount too large).");

      const paidAmount =
        paidAmountRaw !== null
          ? paidAmountRaw
          : paymentType === "credit"
          ? 0
          : total;

      if (paidAmount > total) throw new Error("paidAmount cannot be greater than total.");

      const receiptNo = await generateReceiptNo(tx as any, storeId);

      const sale = await tx.sale.create({
        data: {
          storeId,
          cashierId,
          customerId,
          receiptNo,
          paymentType,
          subtotal,
          discount,
          total,
          paidAmount,
        },
        select: { id: true, receiptNo: true, subtotal: true, discount: true, total: true, paidAmount: true, createdAt: true },
      });

      // create items + decrement stock
      for (const it of normalizedItems) {
        const lineTotal = round2(it.qty * it.unitPrice);

        await tx.saleItem.create({
          data: {
            saleId: sale.id,
            productId: it.productId,
            qty: it.qty,
            unitPrice: it.unitPrice,
            lineTotal,
          },
        });

        // decrement
        await tx.inventory.update({
          where: { storeId_productId: { storeId, productId: it.productId } },
          data: { qty: { decrement: it.qty }, updatedAt: new Date() },
        });
      }

      return sale;
    });

    return res.status(201).json({ data: result });
  } catch (e: any) {
    const msg = e?.message || "Internal Server Error";
    if (
      msg.includes("Ombor yetarli emas") ||
      msg.includes("Invalid") ||
      msg.includes("not found") ||
      msg.includes("cannot")
    ) {
      return res.status(400).json({ error: msg });
    }
    console.error(e);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}