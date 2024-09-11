const express = require('express')
const app = express()
const mongoose = require('mongoose');
const Product = require('./models/productModel')

let port = 3000


app.use(express.json())
// middelware setup

app.use(express.urlencoded({extended: false}))


app.get('/', (req,res) => {
    res.send('index')
})
app.get('/blog', (req,res) => {
    res.send('Hello blog')
})



app.get('/products',  async(req,res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})


app.get('/products/:id',  async(req,res) => {
    try {
        const {id} = req.params
        const products = await Product.findById(id)
        res.status(200).json(products)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

app.post('/products', async (req,res) => {
  try {
    const product = await Product.create(req.body)
    res.status(200).json(product)
    
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
})


/// update

app.put('/products/:id', async (req,res) => {
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
  })

mongoose.connect('mongodb+srv://tarikjaidani:123456*@cluster0.ppcyl.mongodb.net/API-Node?retryWrites=true&w=majority&appName=Cluster0/')
.then(()=>{

    app.listen(port, ()=> {
    console.log(`Node API app is running on port ${port}`)
})
    console.log("Connected to mongoDB")
}).catch((error)=>{
    console.log(error)
})

 