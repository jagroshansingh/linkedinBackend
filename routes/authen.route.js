const express=require('express')
const authrouter=express.Router()
const {AuthModel}=require('../models/authen.model')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

authrouter.post('/register',async(req,res)=>{
    try {
        let exist=await AuthModel.find({'email':req.body.email})
        if(exist.length==0)
        {
            bcrypt.hash(req.body.password, 5, async(err, hash)=> {
                // Store hash in your password DB.
                if(err) res.send(err)
                else
                {
                    let ans=new AuthModel({...req.body,password:hash})
                    await ans.save();
                    res.send({msg:'Registered Successfully'})
                    // res.send(await AuthModel.find())
                }
            });          
        }
        else
        {
            res.send({msg:'User already exist, please login'})
        }
    } catch (error) {
        res.send(error)
    }
})

authrouter.post('/login',async(req,res)=>{
    try{
        let exist=await AuthModel.find({'email':req.body.email})
        if(exist.length==0) res.send({msg:'Incorrect Credentials'})
        else if(exist.length==1)
        {
            bcrypt.compare(req.body.password, exist[0].password, function(err, result) {
               if(result)
               {
                const token = jwt.sign({ author: exist[0]._id }, 'masai');
                res.send({msg:'Login success',token})
               }
               else
               {
                res.send({msg:'Incorrect Credentials'})
               }
            });    
        }
        else
        {
            res.send({msg:'User already exist, please login'})
        } 
    }catch(err){
        res.send(err)
    }
})

module.exports={authrouter}