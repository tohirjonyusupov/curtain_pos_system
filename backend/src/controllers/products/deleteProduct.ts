import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

function parseStoreId(req: Request) {
  const storeIdRaw = req.query.storeId ?? req.body.storeId;
  const storeId = Number(storeIdRaw);
  if (!storeIdRaw || Number.isNaN(storeId) || storeId <= 0) return null;
  return storeId;
}

function parseId(req: Request) {
  const idRaw = req.params.id;
  const id = Number(idRaw);
  if (!idRaw || Number.isNaN(id) || id <= 0) return null;
  return id;
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const id = parseId(req);
    if (!id) {
      return res.status(400).json({ error: "id must be a positive integer." });
    }

    const storeId = parseStoreId(req);
    if (!storeId) {
      return res
        .status(400)
        .json({ error: "storeId is required (query or body)." });
    }

    const existing = await prisma.product.findFirst({
      where: { id, storeId },
      select: {
        id: true,
        saleItems: {
          select: { id: true },
          take: 1,
        },
      },
    });

    if (!existing) {
      return res.status(404).json({ error: "Product not found." });
    }

    if (existing.saleItems.length > 0) {
      return res.status(409).json({
        error: "Product cannot be deleted because it is used in sales.",
      });
    }

    await prisma.$transaction(async (tx) => {
      await tx.inventory.deleteMany({
        where: { storeId, productId: id },
      });

      await tx.product.delete({
        where: { id },
      });
    });

    return res.json({ message: "Product deleted successfully." });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
