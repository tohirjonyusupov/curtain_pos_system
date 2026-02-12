import { Router } from "express";
import { getProducts } from "../controllers/products/getProduct";
import { getProductById } from "../controllers/products/getProductById";
import { createProduct } from "../controllers/products/createProduct";
import { updateProduct } from "../controllers/products/updateProduct";
import { toggleProduct } from "../controllers/products/toggleProduct";

const productRouter = Router();

productRouter.get("/", getProducts);

productRouter.get("/:id", getProductById);

productRouter.post("/", createProduct);

productRouter.patch("/:id", updateProduct);

productRouter.patch("/:id/toggle", toggleProduct);

export default productRouter;
