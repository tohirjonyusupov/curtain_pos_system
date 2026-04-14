"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = getProducts;
const prisma_1 = require("../../lib/prisma");
function parseStoreId(req) {
    const storeIdRaw = req.query.storeId ?? req.body.storeId;
    const storeId = Number(storeIdRaw);
    if (!storeIdRaw || Number.isNaN(storeId) || storeId <= 0)
        return null;
    return storeId;
}
async function getProducts(req, res) {
    try {
        const storeId = parseStoreId(req);
        if (!storeId) {
            return res
                .status(400)
                .json({ error: "storeId is required (query or body)." });
        }
        const q = typeof req.query.q === "string" ? req.query.q.trim() : "";
        const activeRaw = req.query.active;
        let isActive;
        if (typeof activeRaw === "string") {
            if (activeRaw === "true")
                isActive = true;
            if (activeRaw === "false")
                isActive = false;
        }
        const data = await prisma_1.prisma.product.findMany({
            where: {
                storeId,
                ...(q
                    ? {
                        OR: [
                            { name: { contains: q, mode: "insensitive" } },
                            { category: { contains: q, mode: "insensitive" } },
                            { sku: { contains: q, mode: "insensitive" } },
                        ],
                    }
                    : {}),
                ...(typeof isActive === "boolean" ? { isActive } : {}),
            },
            orderBy: { id: "desc" },
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
