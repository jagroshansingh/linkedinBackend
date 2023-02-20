const mongoose=require('mongoose')

const authSchema=mongoose.Schema({
    name:String,
    email:String,
    gender:String,
    password:String,
    age:String,
    city:String,
})

const AuthModel=mongoose.model('authentication',authSchema)

module.exports={AuthModel}