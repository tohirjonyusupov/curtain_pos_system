import { Router } from "express";
import { createSale } from "../controllers/sales/createSale";
import { getSales } from "../controllers/sales/getSales";
import { getSaleById } from "../controllers/sales/getSaleById";

const salesRouter = Router();

salesRouter.post("/", createSale);
salesRouter.get("/", getSales);
salesRouter.get("/:id", getSaleById);

export default salesRouter;
