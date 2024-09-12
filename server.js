const productRoutes = require('./routes/productRoutes')
require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose');



 
const port =process.env.port
const MONGO_URL = process.env.MONGO_URL

app.use(express.json())
// middelware setup

app.use(express.urlencoded({extended: false}))
app.use('/api/products', productRoutes)

app.get('/', (req,res) => {
    res.send('index')
})
app.get('/blog', (req,res) => {
    res.send('Hello blog')
})



// Database connection
mongoose.connect(MONGO_URL)
.then(()=>{

    app.listen(port, ()=> {
    console.log(`Node API app is running on port ${port}`)
})
    console.log("Connected to mongoDB")
}).catch((error)=>{
    console.log(error)
})

 