import type { Request, Response } from "express";
import type { PaymentType } from "@prisma/client";
import { prisma } from "../../lib/prisma";

const PAYMENT_TYPES = new Set<PaymentType>(["cash", "card", "mixed", "credit"]);

function parseStoreId(req: Request) {
  const storeIdRaw = req.query.storeId ?? req.body.storeId;
  const storeId = Number(storeIdRaw);
  if (!storeIdRaw || Number.isNaN(storeId) || storeId <= 0) return null;
  return storeId;
}

function parsePaymentType(raw: unknown) {
  if (typeof raw !== "string") return undefined;
  if (!PAYMENT_TYPES.has(raw as PaymentType)) return undefined;
  return raw as PaymentType;
}

export async function getSales(req: Request, res: Response) {
  try {
    const storeId = parseStoreId(req);
    if (!storeId) {
      return res
        .status(400)
        .json({ error: "storeId is required (query or body)." });
    }

    const q = typeof req.query.q === "string" ? req.query.q.trim() : "";
    const paymentType = parsePaymentType(req.query.paymentType);

    const data = await prisma.sale.findMany({
      where: {
        storeId,
        ...(paymentType ? { paymentType } : {}),
        ...(q
          ? {
              OR: [
                { receiptNo: { contains: q, mode: "insensitive" } },
                { note: { contains: q, mode: "insensitive" } },
                { customer: { fullName: { contains: q, mode: "insensitive" } } },
                { customer: { phone: { contains: q, mode: "insensitive" } } },
              ],
            }
          : {}),
      },
      orderBy: { id: "desc" },
      select: {
        id: true,
        storeId: true,
        cashierId: true,
        customerId: true,
        receiptNo: true,
        paymentType: true,
        subtotal: true,
        discount: true,
        total: true,
        paidAmount: true,
        note: true,
        createdAt: true,
        cashier: {
          select: {
            id: true,
            fullName: true,
            username: true,
          },
        },
        customer: {
          select: {
            id: true,
            fullName: true,
            phone: true,
          },
        },
        _count: {
          select: { items: true },
        },
      },
    });

    return res.json({ data });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
