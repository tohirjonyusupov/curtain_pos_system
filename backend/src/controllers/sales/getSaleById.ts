import type { Request, Response } from "express";
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

export async function getSaleById(req: Request, res: Response) {
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

    const data = await prisma.sale.findFirst({
      where: {
        id,
        storeId,
      },
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
        items: {
          select: {
            id: true,
            productId: true,
            qty: true,
            unitPrice: true,
            lineTotal: true,
            product: {
              select: {
                name: true,
                sku: true,
                category: true,
                unit: true,
              },
            },
          },
        },
      },
    });

    if (!data) {
      return res.status(404).json({ error: "Sale not found." });
    }

    return res.json({ data });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
