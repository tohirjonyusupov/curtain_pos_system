import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

function parseStoreId(req: Request) {
  const storeIdRaw = req.query.storeId ?? req.body.storeId;
  const storeId = Number(storeIdRaw);
  if (!storeIdRaw || Number.isNaN(storeId) || storeId <= 0) return null;
  return storeId;
}

export async function getInventory(req: Request, res: Response) {
  try {
    const storeId = parseStoreId(req);
    if (!storeId) {
      return res.status(400).json({ error: "storeId is required. Example: /inventory?storeId=1" });
    }

    const q = typeof req.query.q === "string" ? req.query.q.trim() : "";

    const data = await prisma.inventory.findMany({
      where: {
        storeId,
        ...(q
          ? {
              OR: [
                { product: { name: { contains: q, mode: "insensitive" } } },
                { product: { category: { contains: q, mode: "insensitive" } } },
                { product: { sku: { contains: q, mode: "insensitive" } } },
              ],
            }
          : {}),
      },
      orderBy: [{ productId: "desc" }],
      select: {
        id: true,
        storeId: true,
        productId: true,
        qty: true,
        updatedAt: true,
        product: {
          select: {
            name: true,
            sku: true,
            category: true,
            unit: true,
            basePrice: true,
            isActive: true,
          },
        },
      },
    });
    if (data.length === 0) {
      return res.status(404).json({ error: "Inventory is empty for the given storeId and query." });
    }
    return res.json({ data });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
