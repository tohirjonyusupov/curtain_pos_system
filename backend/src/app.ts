import express from "express";
import cors from "cors";
import productRouter from "./routes/product.routes";
import inventoryRouter from "./routes/inventory.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/products", productRouter); 
app.use("/inventory", inventoryRouter);

export default app;