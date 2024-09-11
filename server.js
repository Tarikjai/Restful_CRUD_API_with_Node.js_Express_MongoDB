const express = require('express')
const app = express()

//route

app.get('/', (req,res) => {
    res.send('Hello')
})

let port = 3000
app.listen(port, ()=> {
    console.log(`Node API app is running on port ${port}`)
})