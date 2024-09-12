const productRoute = require('./routes/productRoutes')
require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose');
const errorMiddleware = require('./middleware/errorMiddleware')
const cors = require('cors')

const port =process.env.port
const MONGO_URL = process.env.MONGO_URL
const FRONTEND = process.env.FRONTEND


var corsOptions = {
    origin: FRONTEND,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use(cors(corsOptions))
app.use(express.json())


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

 