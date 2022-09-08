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
    if (!validObjectId(Id)) return res.send("blogId is incorrect")
    // let blogId = mongoose.Types.ObjectId.isValid(Id)
    // if (blogId == false) return res.send("blogId is incorrect")
    


    // const data = await blogsModel.findById(blogId)
    //if (!data) return res.send({ msg: false, stause: "data not found" })
    //const userId = datas.authorId
    const decodedToken = jwt.verify(token, "Project-1 Blogging-group-6")
    const blogid = req.params.blogId
    if(!blogid)return res.send("pass")
    const datas = await blogsModel.findById(Id)
    if (!datas) return res.send({ msg: false, stause: "data not found" })
    let auth=datas.authorId
    let tokenid= decodedToken.userId
    if(tokenid != auth)return res.send("not match") 
    //console.log(tokenValidator)
    //if (decodedToken.userId != userId) return res.send({msg : "unauthrized", status : false})

    next() 
  } catch (error) {
    console.log(error)
    return res.status(500).send({ status: false, Error: error.message })
  }
}


module.exports.authentication = authentication;
module.exports.authorisation = authorisation


