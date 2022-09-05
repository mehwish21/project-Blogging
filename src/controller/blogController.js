const authorModel=require("../model/authorModel");
const blogsModel = require("../model/blogsModel");


const createBlog= async function(req,res){
    try{
    let blog=req.body;
    let authorId=req.body.authorId;

    if(!authorId)
        return res.status(400).send({status:false,msg:""})

        let authId=await authorModel.find({_id:authorId});
        if(authId){
            let blogCreated=await blogsModel.create(blog);
            return res.status(201).send({ status:true,data: blogCreated });
        }
    }
    catch(err){
        return res.status(400).send({status:false,msg:err.message})
    }
    

}

module.exports.createBlog=createBlog;