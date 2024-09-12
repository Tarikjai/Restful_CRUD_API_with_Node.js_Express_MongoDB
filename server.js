const productRoute = require('./routes/productRoutes')
require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose');
const errorMiddleware = require('./middleware/errorMiddleware')


app.use(express.json())

const port =process.env.port
const MONGO_URL = process.env.MONGO_URL

app.use(express.json())
// middelware setup
app.use(express.urlencoded({extended: false}))

// Routes
app.use('/api/products', productRoute)

app.get('/', (req,res) => {
    //throw new Error('fake error')
    res.send('Hello NODE API')
})
app.get('/blog', (req,res) => {
    res.send('Hello blog')
})

// error errorMiddleware
app.use(errorMiddleware);

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

 