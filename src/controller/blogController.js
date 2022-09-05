const authorModel=require("../model/authorModel");
const blogsModel = require("../model/blogsModel");


const createBlog= async function(req,res){
    let blog=req.body;
    let authorId=req.body.authorId;

    if(authorId){
        let authId=await authorModel.find({_id:authorId});
        if(authId){
            let blogCreated=await blogsModel.create(blog);
            res.send({ status:true,data: blogCreated });
        }else{
            res.send({status:false,msg:""})
        }
       
    }
    res.send({status:false,msg:""})

}

module.exports.createBlog=createBlog;