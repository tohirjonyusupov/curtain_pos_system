"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = createProduct;
const prisma_1 = require("../../lib/prisma");
const UNIT_VALUES = new Set(["meter", "piece"]);
function parseStoreId(req) {
    const storeIdRaw = req.query.storeId ?? req.body.storeId;
    const storeId = Number(storeIdRaw);
    if (!storeIdRaw || Number.isNaN(storeId) || storeId <= 0)
        return null;
    return storeId;
}
function parseUnit(unitRaw) {
    if (typeof unitRaw !== "string")
        return null;
    if (!UNIT_VALUES.has(unitRaw))
        return null;
    return unitRaw;
}
function parseIsActive(raw) {
    if (typeof raw === "boolean")
        return raw;
    if (typeof raw !== "string")
        return undefined;
    if (raw === "true")
        return true;
    if (raw === "false")
        return false;
    return undefined;
}
async function createProduct(req, res) {
    try {
        const storeId = parseStoreId(req);
        if (!storeId) {
            return res
                .status(400)
                .json({ error: "storeId is required (query or body)." });
        }
        const name = typeof req.body.name === "string" ? req.body.name.trim() : "";
        if (!name) {
            return res.status(400).json({ error: "name is required." });
        }
        const unit = parseUnit(req.body.unit);
        if (!unit) {
            return res
                .status(400)
                .json({ error: "unit must be one of: meter, piece." });
        }
        const basePriceRaw = req.body.basePrice;
        const basePrice = Number(basePriceRaw);
        if (basePriceRaw === undefined || Number.isNaN(basePrice) || basePrice < 0) {
            return res
                .status(400)
                .json({ error: "basePrice must be a non-negative number." });
        }
        const sku = typeof req.body.sku === "string" ? req.body.sku.trim() : null;
        const category = typeof req.body.category === "string" ? req.body.category.trim() : null;
        const isActive = parseIsActive(req.body.isActive);
        const data = await prisma_1.prisma.product.create({
            data: {
                storeId,
                sku: sku || null,
                name,
                category: category || null,
                unit,
                basePrice,
                ...(typeof isActive === "boolean" ? { isActive } : {}),
            },
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
        return res.status(201).json({ data });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
