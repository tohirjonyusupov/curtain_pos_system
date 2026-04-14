"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleProduct = toggleProduct;
const prisma_1 = require("../../lib/prisma");
function parseStoreId(req) {
    const storeIdRaw = req.query.storeId ?? req.body.storeId;
    const storeId = Number(storeIdRaw);
    if (!storeIdRaw || Number.isNaN(storeId) || storeId <= 0)
        return null;
    return storeId;
}
function parseId(req) {
    const idRaw = req.params.id;
    const id = Number(idRaw);
    if (!idRaw || Number.isNaN(id) || id <= 0)
        return null;
    return id;
}
async function toggleProduct(req, res) {
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
        const existing = await prisma_1.prisma.product.findFirst({
            where: { id, storeId },
            select: { id: true, isActive: true },
        });
        if (!existing) {
            return res.status(404).json({ error: "Product not found." });
        }
        const data = await prisma_1.prisma.product.update({
            where: { id },
            data: { isActive: !existing.isActive },
            select: {
                id: true,
                storeId: true,
                sku: true,
                name: true,
                category: true,
                unit: true,
                basePrice: true,
                isActive: true,
                createdAt: true,
            },
        });
        return res.json({ data });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
