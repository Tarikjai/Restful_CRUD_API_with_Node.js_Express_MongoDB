const express = require("express")
const router = express.Router()
//const Product = require('../models/productModel')
const {getProducts, getProduct, createPruduct,updateProduct ,deleteProduct} = require('../controllers/productController')

// get all products
router.get('/', getProducts )

// get a specific product
router.get('/:id', getProduct )

// add a  product
router.post('/', createPruduct)

/// update a specific product
router.put('/:id', updateProduct )

// Delete a product 

router.delete("/:id",  deleteProduct )


module.exports = router