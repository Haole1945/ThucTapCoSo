const express = require('express');
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const routes = require('./routes')
const bodyParser = require('body-parser')
dotenv.config()

const app = express()
const port = process.env.PORT || 3001

app.use(bodyParser.json())

routes(app);

console.log(process.env.MONGO_DB)

mongoose.connect(`${process.env.MONGO_DB}`)
    .then(()=>{
    console.log('Connect db success')
    }) 
    .catch((error) => {
    console.log(error)
    })
    


app.listen(port, () => {
    console.log('Sever is running in port', + port)
}) 