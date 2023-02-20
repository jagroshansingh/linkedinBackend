const express=require('express')
const app=express()
app.use(express.json())
require('dotenv').config()
const {connection}=require('./db')
const {authrouter}=require('./routes/authen.route')
const cors=require('cors')
app.use(cors())
const {authenticate}=require("./middlewares/auth.middleware")
const {postrouter}=require("./routes/post.route")

app.use('/users',authrouter)

app.use(authenticate)
app.use('/',postrouter)

app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log('DB is connected')
    } catch (error) {
        console.log(error)
    }
    console.log('Server is running')
})