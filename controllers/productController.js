const Product = require('../models/productModel')

const asyncHandler = require('express-async-handler')

// get all products

const getProducts =  asyncHandler(async(req,res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        res.status(500);
        throw new Error(error.message)
    }
})

// get a single product 

const getProduct =  asyncHandler(async(req,res) => {
    try {
        const {id} = req.params
        const products = await Product.findById(id)
        res.status(200).json(products)
    } catch (error) {
        res.status(500);
        throw new Error(error.message)
        
    }
})

// add a  product
const  createPruduct = asyncHandler(async(req,res) => {
    try {
      const product = await Product.create(req.body)
      res.status(200).json(product)
      
    } catch (error) {
        res.status(500);
        throw new Error(error.message)
    }
  })


// update product 
const updateProduct = asyncHandler(async(req,res) => {
    try {
        const {id} = req.params
      const product = await Product.findByIdAndUpdate(id, req.body)
        // No product founded
        if(!product) {
            res.status(404);
            throw new Error(`Cannot find the id: ${id}`);
        } else {
            const updatedProduct = await Product.findById(id)
            res.status(200).json(updatedProduct)
        }
            
    } catch (error) {
        res.status(500);
        throw new Error(error.message)
    }
  })

//delete product

const deleteProduct = asyncHandler(async (req,res)=>{
    try {
      const {id} = req.params
      const product = await Product.findByIdAndDelete(id)
      // No product founded
      if(!product) {
        res.status(404);
        throw new Error(`Cannot find the id: ${id}`);
        
      } 
      res.status(200).json(product)
      console.log("Product deleted")
      
    } catch (error) {
        res.status(500);
        throw new Error(error.message)
    }
})

module.exports ={

    getProducts, getProduct, createPruduct,updateProduct ,deleteProduct
}