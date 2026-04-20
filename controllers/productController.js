import mongoose from 'mongoose'
import Product from '../models/product.js'
import isAdmin from './userControler.js'

export async function createProducts(req, res) {
    if (!isAdmin(req)) {
        res.status(403).json({
            message: "Acsess denied"
        })
    }
    try {
        const exsistingProduct = await Product.findOne({
            productId: req.body.productId
        })
        if (exsistingProduct != null) {
            res.status(400).json({
                message: "Product with this product id already exsists"
            })
            return
        }
        const newProduct = new Product(
            {
                productId: req.body.productId,
                name: req.body.name,
                altNames: req.body.altNames,
                price: req.body.price,
                labelledPrice: req.body.labelledPrice,
                description: req.body.description,
                images: req.body.images,
                brand: req.body.brand,
                model: req.body.model,
                category: req.body.category,
                stock: req.body.status
            }
        )
        await newProduct.save()
        res.status(201).json({
            message: "Product created sucsussfully"
        })
    } catch (err) {
        res.status(500).json(
            {
                message: "Server error"
            }
        )
    }
}

export async function getAllProducts(req, res) {
    try {
        if (isAdmin(req)) {
            const products = await Product.find()
            res.json(products)
        } else {
            const product = await Product.find({ isAvailable: true })
            res.json(product)
        }
    } catch (err) {
        res.status(500).json({
            message: "Error fetching data"
        })
    }
}

export async function deleteProduct(req, res) {
    if (!isAdmin(req)) {
        res.status(403).json({
            message: "Unauthorized"
        })
        return
    }
    try {
        await Product.deleteOne({
            productId: req.params.productId
        })
        res.status(201).json({
            message: "Product deleted successfully"
        })
    } catch (err) {
        res.status(500).json({
            message: "Something went wrong"
        })
    }
}

export async function updateProducts(req, res) {
    if (!isAdmin(req)) {
        res.status(403).json({
            message: "Unauthorized"
        })
        return
    }
    try {
        await Product.updateOne({
            productId: req.params.productId
        }, {
            name: req.body.name,
            altNames: req.body.altNames,
            price: req.body.price,
            labelledPrice: req.body.labelledPrice,
            description: req.body.description,
            images: req.body.images,
            brand: req.body.brand,
            model: req.body.model,
            category: req.body.category,
            stock: req.body.status,
            isAvailable: req.body.isAvailable
        }
        )
    } catch (err) {
        res.status(500).json({
            message: "Something went wrong"
        })
    }
}

export async function getProductById(req, res) {
    const product = await Product.findOne({
        productId: req.params.productId
    })
    if (product == null) {
        res.status(404).json({
            message: "Product not found"
        })
        return
    }else{
        if(product.isAvailable){
            return res.status(200).json(product);
        }
        if (!isAdmin(req)) {
            if (product.isAvailable == false) {
                res.status(401).json({
                    message: "unauthorized"
                })
                return
            } else {
                res.status(401).json({
                    message: "Unauthorized"
                })
            }
        } else {
            res.status(200).json(product)
            return
        }
    }
}