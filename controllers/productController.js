const Product = require('../models/productModel')


// get all products

const getProducts =  async(req,res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
}

// get a specific product 

const getProduct =  async(req,res) => {
    try {
        const {id} = req.params
        const products = await Product.findById(id)
        res.status(200).json(products)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
}

// add a  product
const  createPruduct = async (req,res) => {
    try {
      const product = await Product.create(req.body)
      res.status(200).json(product)
      
    } catch (error) {
      console.log(error.message)
      res.status(500).json({message: error.message})
    }
  }


// update product 
const updateProduct = async (req,res) => {
    try {
        const {id} = req.params
      const product = await Product.findByIdAndUpdate(id, req.body)
        // No product founded
        if(!product) {
            return res.status(404).json({message: `Cannot find the id: ${id}`})
        } else {
            const updatedProduct = await Product.findById(id)
            res.status(200).json(updatedProduct)
        }
            
    } catch (error) {
      console.log(error.message)
      res.status(500).json({message: error.message})
    }
  }

//delete product

const deleteProduct = async (req,res)=>{
    try {
      const {id} = req.params
      const product = await Product.findByIdAndDelete(id)
      // No product founded
      if(!product) {
          return res.status(404).json({message: `Cannot find the id: ${id}`})
      } 
      res.status(200).json(product)
      console.log("Product deleted")
      
    } catch (error) {
      res.status(500).json({message: error.message})
    }
}

module.exports ={

    getProducts, getProduct, createPruduct,updateProduct ,deleteProduct
}