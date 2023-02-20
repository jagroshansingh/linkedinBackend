const express=require('express')
const {PostModel}=require('../models/posts.model')
const postrouter=express.Router()

postrouter.post('/create',async(req,res)=>{
    try {
        let ans=new PostModel(req.body)
        ans.save()
        res.send({msg:'post added successfully'})
    } catch (error) {
        res.send(error)
    }
})

postrouter.get('/posts',async(req,res)=>{
    let author=req.body.author 
    try {
        let see=await PostModel.find({'author':author})
        res.send(see)
    } catch (error) {
        res.send(error)
    }
})

module.exports={postrouter}