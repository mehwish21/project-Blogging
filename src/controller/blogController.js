const authorModel = require("../model/authorModel");
const blogsModel = require("../model/blogsModel");
const mongoose = require('mongoose');
const {validObjectId}=require('../Validation/validator')

const createBlog = async function (req, res) {
    try {
        let blog = req.body;
        let authorId = req.body.authorId;

        if (!authorId)
            return res.status(400).send({ status: false, msg: "" })
            if (!validObjectId(authId)) return res.send("authorId is incorrect")

        let authId = await authorModel.find({ _id: authorId });
        if (authId) {
            let blogCreated = await blogsModel.create(blog);
            return res.status(201).send({ status: true, data: blogCreated });
        }
    }
    catch (err) {
        return res.status(400).send({ status: false, msg: err.message })
    }

}



const updateBlogs = async function (req, res) {
    try {
        const blogId = req.params.blogId;
        const blogData = req.body;

        if (Object.keys(blogData).length == 0)
            return res.status(404).send({ status: false, msg: "Body is required" });

            if (!validObjectId(Id)) return res.send("blogId is incorrect")
        let blog = await blogsModel.findOneAndUpdate({ _id: blogId, isDeleted: false },
            {
                $set: { isPublished: true, body: blogData.body, title: blogData.title, publishedAt: new Date() },
                $push: { tags: blogData.tags, subcategory: blogData.subcategory }
            },
            { new: true });

        if (!blog)
            return res.send({ status: false, msg: "blogId is not present" })
        return res.status(200).send({ status: true, data: blog });

    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, Error: error.message })
    }

}




const deleteBlogsById = async function (req, res) {

    let Id = req.params.blogId


    
    if (!validObjectId(Id)) return res.send("blogId is incorrect")

    let blog1 = await blogsModel.findById(Id)
    if (blog1.isDeleted == true) return res.status(404).send()

    let Blog = await blogsModel.findByIdAndUpdate(Id, { $set: { isDeleted: true, deletedAt: new Date() } });
    if (!Blog) {
        return res.status(404).send();

    }
    return res.status(200).send()

}


const deleteByquery = async function (req, res) {
    try {
        let data = req.query
        if (Object.keys(data).length == 0)
            return res.status(404).send({ status: false, msg: "please enter any query" });

            if (!Object.values(data).some(v => v))return res.status(404).send({ status: false, msg: "need value" });

        if (!data) return res.send("userId  is not writen")


        if (req.query.authorId) {
            const data = req.query.authorId

           
            if (!data && req.query.authorId == null) return res.send("userId  is not writen")

            if (!validObjectId(Id)) return res.send("blogId is incorrect")
        }
       
        
        const blogUpdate = await blogsModel.find(data).updateMany({ isDeleted: true, deletedAt: new Date() })

        if (blogUpdate.length == 0) return res.send({ status: false, msg: "no data found" })
        return res.send(blogUpdate)

    } catch (err) {
        return res.status(400).send({ status: false, msg: err.message })
    }

}


let obj = { x: null };
let obj1 = { z:121 };

const a= Object.values(obj).some(v => v);
console.log(a)

const b=Object.values(obj1).some(v => v);
console.log(b)

 const filteredBlogs=async function (req,res){
    try{
        let filters = req.query;
        let filterBolg=await blogsModel.find({"isDeleted":false,"isPublished":true})
        if(!filterBolg)
        return res.status(404).send({status:false,msg:""})
    
        if (Object.keys(filters).length != 0) {
            
            let getBlogs = await blogsModel.find(filters).populate("authorId")
            if (getBlogs.length===0) {
                return res.status(404).send({ status: false, msg: "No such blog exist" })
            }
            res.status(200).send({ status: true, data: getBlogs })
        }
    }catch(err){
        res.send({status:false,msg:err.message});
    }

    
    }


    const trymid=function(req, res){
        res.send("worked")
    }


module.exports = { createBlog, updateBlogs, deleteByquery, deleteBlogsById,filteredBlogs, trymid }
