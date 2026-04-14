"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = updateProduct;
const prisma_1 = require("../../lib/prisma");
const UNIT_VALUES = new Set(["meter", "piece"]);
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
async function updateProduct(req, res) {
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
        const data = {};
        if ("sku" in req.body) {
            const sku = typeof req.body.sku === "string" ? req.body.sku.trim() : "";
            data.sku = sku || null;
        }
        if ("name" in req.body) {
            const name = typeof req.body.name === "string" ? req.body.name.trim() : "";
            if (!name) {
                return res.status(400).json({ error: "name cannot be empty." });
            }
            data.name = name;
        }
        if ("category" in req.body) {
            const category = typeof req.body.category === "string" ? req.body.category.trim() : "";
            data.category = category || null;
        }
        if ("unit" in req.body) {
            const unit = parseUnit(req.body.unit);
            if (!unit) {
                return res
                    .status(400)
                    .json({ error: "unit must be one of: meter, piece." });
            }
            data.unit = unit;
        }
        if ("basePrice" in req.body) {
            const basePrice = Number(req.body.basePrice);
            if (Number.isNaN(basePrice) || basePrice < 0) {
                return res
                    .status(400)
                    .json({ error: "basePrice must be a non-negative number." });
            }
            data.basePrice = basePrice;
        }
        if ("isActive" in req.body) {
            const isActive = parseIsActive(req.body.isActive);
            if (typeof isActive !== "boolean") {
                return res
                    .status(400)
                    .json({ error: "isActive must be true or false." });
            }
            data.isActive = isActive;
        }
        if (Object.keys(data).length === 0) {
            return res.status(400).json({ error: "No fields to update." });
        }
        const existing = await prisma_1.prisma.product.findFirst({
            where: { id, storeId },
            select: { id: true },
        });
        if (!existing) {
            return res.status(404).json({ error: "Product not found." });
        }
        const updated = await prisma_1.prisma.product.update({
            where: { id },
            data,
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
        return res.json({ data: updated });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
