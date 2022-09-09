const blogsModel = require("../model/blogsModel");
const jwt = require("jsonwebtoken");
const mongoose= require('mongoose')
const {validObjectId}=require('../Validation/validator')

const authentication = function (req, res, next) {
  try {
    let token = req.headers["x-api-key"];
    if (!token) return res.status(404).send({ status: false, msg: "token must be present" });
    
    let decodedToken = jwt.verify(token, "Project-1 Blogging-group-6");
    
    if (!decodedToken)
      return res.send({ status: false, msg: "Invalid Token" })
      
    next();
  } catch (error) {
    console.log(error)
    return res.status(500).send({ status: false, Error: error.message })
  }
}


const authorisation = async function (req, res, next) {
  try {
    const Id = req.params.blogId
    const token = req.headers["x-api-key"];
    //find in blog data
    if(!Id)return res.status(400).send({msg:"Please provide blogId"})
    if (!validObjectId(Id)) return res.status(400).send("blogId is Invalid")
    
    const decodedToken = jwt.verify(token, "Project-1 Blogging-group-6");
    const blog = await blogsModel.findById(Id)
    if (!blog) return res.status(404).send({ msg: false, status: "" })
    let authId=blog.authorId
    let tokenid= decodedToken.userId
    if(tokenid != authId)return res.status(403).send({status:false, msg:"you are not authorised"}) 
    
    next() 
  } catch (error) {
    console.log(error)
    return res.status(500).send({ status: false, Error: error.message })
  }
}


module.exports = {authentication,authorisation};



