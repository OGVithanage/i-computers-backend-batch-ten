import express from "express"
import mongoose from "mongoose"
import studentRouter from "./routers/studentRouter.js"
import userRouter from "./routers/userRouter.js"
import { authenticateUser } from "./middlewares/authentication.js";
import productRouter from "./routers/productRouter.js";

const mongodbURI = "mongodb://admin:1234@161.97.184.226:5000/icomputers?authSource=admin&directConnection=true"
const app = express()
const port = 3000

mongoose.connect(mongodbURI).then(
    () => {
        console.log("Connected to Mongodb")
    }
)

app.use(express.json())
app.use(authenticateUser)
app.use("/students", studentRouter)
app.use("/users", userRouter)
app.use("/products", productRouter)

app.listen(port, () => {
    console.log("Server is runnign on port: " + port + "")
})
