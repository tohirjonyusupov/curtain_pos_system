import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

function parseStoreId(req: Request) {
  const storeIdRaw = req.query.storeId ?? req.body.storeId;
  const storeId = Number(storeIdRaw);
  if (!storeIdRaw || Number.isNaN(storeId) || storeId <= 0) return null;
  return storeId;
}

function parseNumber(val: unknown) {
  const n = Number(val);
  if (Number.isNaN(n)) return null;
  return n;
}

export async function adjustInventory(req: Request, res: Response) {
  try {
    const storeId = parseStoreId(req);
    if (!storeId) return res.status(400).json({ error: "storeId is required." });

    const productId = parseNumber(req.body.productId);
    if (!productId || productId <= 0) return res.status(400).json({ error: "productId is required." });

    const deltaQty = parseNumber(req.body.deltaQty);
    if (deltaQty === null || deltaQty === 0) {
      return res.status(400).json({ error: "deltaQty is required and cannot be 0 (use + for kirim, - for chiqim)." });
    }

    // (ixtiyoriy) 3 ta kasr xonagacha
    const roundedDelta = Math.round(deltaQty * 1000) / 1000;

    // product borligini tekshiramiz (storeId bilan)
    const product = await prisma.product.findFirst({
      where: { id: productId, storeId },
      select: { id: true },
    });
    if (!product) return res.status(404).json({ error: "Product not found for this store." });

    const result = await prisma.$transaction(async (tx) => {
      // Inventory bor-yo‘qligini ko‘ramiz
      const inv = await tx.inventory.findUnique({
        where: {
          storeId_productId: { storeId, productId },
        },
        select: { id: true, qty: true },
      });

      if (!inv) {
        // Inventory yo‘q bo‘lsa: faqat musbat delta bilan create qilamiz
        if (roundedDelta < 0) {
          throw new Error("Inventory row not found. Cannot decrement below 0.");
        }

        const created = await tx.inventory.create({
          data: {
            storeId,
            productId,
            qty: roundedDelta,
            updatedAt: new Date(),
          },
          select: {
            id: true,
            storeId: true,
            productId: true,
            qty: true,
            updatedAt: true,
          },
        });

        return { type: "created", inventory: created };
      }

      const currentQty = Number(inv.qty);
      const newQty = Math.round((currentQty + roundedDelta) * 1000) / 1000;

      if (newQty < 0) {
        throw new Error(`Ombor yetarli emas. Bor=${currentQty}, chiqim=${Math.abs(roundedDelta)}`);
      }

      const updated = await tx.inventory.update({
        where: { id: inv.id },
        data: { qty: newQty, updatedAt: new Date() },
        select: {
          id: true,
          storeId: true,
          productId: true,
          qty: true,
          updatedAt: true,
        },
      });

      return { type: "updated", inventory: updated };
    });

    return res.json({ data: result });
  } catch (error: any) {
    // Transaction ichidan throw qilingan xabarni userga ko‘rsatamiz (MVP uchun ok)
    const msg = error?.message || "Internal Server Error";
    if (msg.includes("Ombor yetarli emas") || msg.includes("Cannot decrement")) {
      return res.status(400).json({ error: msg });
    }
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}