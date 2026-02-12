import { Router } from "express";
import { getInventory } from "../controllers/inventory/getInventory";
import { adjustInventory } from "../controllers/inventory/adjustInventory";

const inventoryRouter = Router();

inventoryRouter.get("/", getInventory);

// POST /inventory/adjust
inventoryRouter.post("/adjust", adjustInventory);

export default inventoryRouter;
