const mongoose=require('mongoose')

const postSchema=mongoose.Schema({
    title:String,
    body:String,
    device:String,
    no_if_comments:String,
    author:String,
})

const PostModel=mongoose.model('allposts',postSchema)

module.exports={PostModel}