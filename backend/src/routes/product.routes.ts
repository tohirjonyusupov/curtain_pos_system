import { Router } from "express";
import { getProducts } from "../controllers/products/getProduct";

const productRouter = Router();

// GET /products?storeId=1&q=&active=true
productRouter.get("/", getProducts);

// GET /products/:id?storeId=1
// productRouter.get("/:id", getProductById);

// // POST /products
// productRouter.post("/", createProduct);

// // PATCH /products/:id
// productRouter.patch("/:id", updateProduct);

// // PATCH /products/:id/toggle
// productRouter.patch("/:id/toggle", toggleProduct);

export default productRouter;