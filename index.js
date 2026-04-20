import express from "express";
import mongoose from "mongoose";
import userRouter from "./routers/userRouter.js";
import { authenticateUser } from "./middlewares/authentication.js";
import productRouter from "./routers/productRouter.js";
import cors from "cors"
import dotenv from "dotenv"
import orderRouter from "./routers/orderRouter.js";

dotenv.config()

const mongodbURI = process.env.MONGO_URI
const app = express();
const port = 3000;

mongoose.connect(mongodbURI).then(() => {
  console.log("Connected to Mongodb");
});

app.use(cors())

app.use(express.json());
app.use(authenticateUser);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);

app.listen(port, () => {
  console.log("Server is runnign on port: " + port + "");
});
