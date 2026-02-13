import { Router } from "express";
import { createSale } from "../controllers/sales/createSale";
import { getSales } from "../controllers/sales/getSales";
import { getSaleById } from "../controllers/sales/getSaleById";

const salesRouter = Router();

/**
 * @openapi
 * /sales:
 *   post:
 *     tags: [Sales]
 *     summary: Create sale and decrement inventory
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SaleCreateRequest'
 *     responses:
 *       201:
 *         description: Sale created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SaleCreateResponse'
 *       400:
 *         description: Validation/inventory error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
salesRouter.post("/", createSale);

/**
 * @openapi
 * /sales:
 *   get:
 *     tags: [Sales]
 *     summary: Get sales list
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
 *       - in: query
 *         name: paymentType
 *         required: false
 *         schema:
 *           type: string
 *           enum: [cash, card, mixed, credit]
 *     responses:
 *       200:
 *         description: Sales list
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SaleListResponse'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
salesRouter.get("/", getSales);

/**
 * @openapi
 * /sales/{id}:
 *   get:
 *     tags: [Sales]
 *     summary: Get sale by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: storeId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sale details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SaleDetailResponse'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Sale not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
salesRouter.get("/:id", getSaleById);

export default salesRouter;
