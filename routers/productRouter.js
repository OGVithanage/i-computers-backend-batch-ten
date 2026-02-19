import express from 'express'
import { createProducts, deleteProduct, getAllProducts, getProductById, updateProducts } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.get("/", getAllProducts)
productRouter.post("/", createProducts)
productRouter.get("/search", () => {
    console.log("Search API")
})
productRouter.delete("/:productId", deleteProduct)
productRouter.put("/:productId", updateProducts)
productRouter.get("/:productId", getProductById)

export default productRouter
