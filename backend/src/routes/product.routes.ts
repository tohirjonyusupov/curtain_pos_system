import { Router } from "express";
import { getProducts } from "../controllers/products/getProduct";
import { getProductById } from "../controllers/products/getProductById";
import { createProduct } from "../controllers/products/createProduct";
import { updateProduct } from "../controllers/products/updateProduct";
import { toggleProduct } from "../controllers/products/toggleProduct";

const productRouter = Router();

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
productRouter.get("/", getProducts);

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
productRouter.get("/:id", getProductById);

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
productRouter.post("/", createProduct);

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
productRouter.patch("/:id", updateProduct);

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
productRouter.patch("/:id/toggle", toggleProduct);

export default productRouter;
