import express from "express";
import cors from "cors";
import productRouter from "./routes/product.routes";
import inventoryRouter from "./routes/inventory.routes";
import salesRouter from "./routes/sales.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/products", productRouter); 
app.use("/inventory", inventoryRouter);
app.use("/sales", salesRouter);

export default app;
