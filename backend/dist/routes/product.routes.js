"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getProduct_1 = require("../controllers/products/getProduct");
const getProductById_1 = require("../controllers/products/getProductById");
const createProduct_1 = require("../controllers/products/createProduct");
const updateProduct_1 = require("../controllers/products/updateProduct");
const toggleProduct_1 = require("../controllers/products/toggleProduct");
const deleteProduct_1 = require("../controllers/products/deleteProduct");
const productRouter = (0, express_1.Router)();
/**
 * @openapi
 * /products:
 *   get:
 *     tags: [Products]
 *     summary: Get products list
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
 *     responses:
 *       200:
 *         description: Products list
 *       400:
 *         description: Bad request
 
 */
productRouter.get("/", getProduct_1.getProducts);
/**
 * @openapi
 * /products/{id}:
 *   get:
 *     tags: [Products]
 *     summary: Get product by id
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
 *         description: Product details
 *       400:
 *         description: Bad request
 */
productRouter.get("/:id", getProductById_1.getProductById);
/**
 * @openapi
 * /products:
 *   post:
 *     tags: [Products]
 *     summary: Create product
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
 *             $ref: '#/components/schemas/ProductCreateRequest'
 *     responses:
 *       201:
 *         description: Product created
 *       400:
 *         description: Bad request
 */
productRouter.post("/", createProduct_1.createProduct);
/**
 * @openapi
 * /products/{id}:
 *   patch:
 *     tags: [Products]
 *     summary: Update product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
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
 *             $ref: '#/components/schemas/ProductUpdateRequest'
 *     responses:
 *       200:
 *         description: Product updated
 *       400:
 *         description: Bad request
 *       404:
 *         description: Product not found
 */
productRouter.patch("/:id", updateProduct_1.updateProduct);
/**
 * @openapi
 * /products/{id}:
 *   delete:
 *     tags: [Products]
 *     summary: Delete product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: storeId
 *         required: false
 *         schema:
 *           type: integer
 *         description: Optional if provided in request body.
 *     responses:
 *       200:
 *         description: Product deleted
 *       400:
 *         description: Bad request
 *       404:
 *         description: Product not found
 *       409:
 *         description: Product is used in sales and cannot be deleted
 */
productRouter.delete("/:id", deleteProduct_1.deleteProduct);
/**
 * @openapi
 * /products/{id}/toggle:
 *   patch:
 *     tags: [Products]
 *     summary: Toggle product active state
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: storeId
 *         required: false
 *         schema:
 *           type: integer
 *         description: Optional if provided in request body.
 *     responses:
 *       200:
 *         description: Product toggled
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductResponse'
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
productRouter.patch("/:id/toggle", toggleProduct_1.toggleProduct);
exports.default = productRouter;
