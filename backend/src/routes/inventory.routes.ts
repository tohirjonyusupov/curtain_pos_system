import { Router } from "express";
import { getInventory } from "../controllers/inventory/getInventory";
import { adjustInventory } from "../controllers/inventory/adjustInventory";

const inventoryRouter = Router();

/**
 * @openapi
 * /inventory:
 *   get:
 *     tags: [Inventory]
 *     summary: Get inventory list
 *     parameters:
 *       - in: query
 *         name: storeId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: q
 *         required: false
 *         schema:
 *           type: string
 *         description: Search by product name/category/sku.
 *     responses:
 *       200:
 *         description: Inventory list
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InventoryListResponse'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: No inventory rows found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
inventoryRouter.get("/", getInventory);

/**
 * @openapi
 * /inventory/adjust:
 *   post:
 *     tags: [Inventory]
 *     summary: Increase or decrease inventory
 *     parameters:
 *       - in: query
 *         name: storeId
 *         required: false
 *         schema:
 *           type: integer
 *         description: Optional if provided in request body.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InventoryAdjustRequest'
 *     responses:
 *       200:
 *         description: Inventory adjusted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InventoryAdjustResponse'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
inventoryRouter.post("/adjust", adjustInventory);

export default inventoryRouter;
