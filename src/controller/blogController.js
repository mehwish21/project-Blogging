
//--------------------importing modules-------------------------------------
const authorModel = require("../model/authorModel");
const blogsModel = require("../model/blogsModel");
const mongoose = require('mongoose');
const {validObjectId,typeValid,isString,isNotEmpty,keysLength}=require('../Validation/validator')

//------------------------ creation of blogs post/blogs----------------------
const createBlog = async function (req, res) {
    try {
        let blog = req.body;
        const {title,body,category,subcategory,tag}=blog
        if (keysLength(blog))
            return res.status(400).send({ status: false, msg: "blog details required" });

        let authorId = req.body.authorId;

        //check authorId is present or not
        if (!authorId)  return res.status(400).send({ status: false, msg: "authorId is required" });
 
          
        // Title validation
        if (!title)return res.status(400).send({ status: false, msg: "title is required" });
        blog.title=title.trim();
        if(!isNotEmpty(blog.title))return res.send({msg :"title is empty"})
        if(!isString(blog.title))return res.send({msg :"Type of title  must be string"});

        // validation of body
            if (!body)
            return res.status(400).send({ status: false, msg: "body is required" });
            blog.body=body.trim();
            if(!isNotEmpty(blog.body))return res.send({msg :"body is empty"})
            if(!isString( blog.body))
            return res.status(400).send({ status: false, msg: "Type of body must be string" });

       //validation of category
            if (!category)
            return res.status(400).send({ status: false, msg: "category is required" });
            if(!isString(category))  return res.status(400).send({ status: false, msg: "Type of category must be string" });
            blog.category=category.trim();
            if(!isNotEmpty(blog.category))return res.send({msg :"category is empty"})
           
          
     
       //tag validation
        if (!typeValid(tag))
            return res.status(400).send({ status: false, msg: "Incorrect type of tags" });
        
        for(let i=0;i<tag.length;i++){
            if(typeof tag[i]!=="string")return res.send({msg:"Plese enter tags in string format"})
            
            if(!isNotEmpty(tag[i])) return res.send({msg:"tag is empty"});
        }
        blog.tag=tag.map(a=>a.trim())  //check the type of each tag element

        // check type of subcategory
        if (!typeValid(subcategory))
            return res.status(400).send({ status: false, msg: "Incorrect type of subcategory" });

            for(let i=0;i<subcategory.length;i++){
                if(typeof subcategory[i]!=="string")return res.send({msg:"Plese enter subcategory in string format"})
                
                if(!isNotEmpty(subcategory[i])) return res.send({msg:"subcategory is empty"});
            }
            blog.subcategory=subcategory.map(a=>a.trim())  //check the type of each subcategory element
    

        // check authorId is valid or not
        blog.authorId=authorId.trim();
        if(!validObjectId(blog.authorId))return res.send({ msg: "authorId is not valid" })
        
        let authId = await authorModel.find({ _id: blog.authorId }); //find authorId in athorModel

        // check given authId is present in the author document or not
        if (authId) {
            let blogCreated = await (await blogsModel.create(blog));
            return res.status(201).send({ status: true, data: blogCreated });
        }
    }
    catch (err) {
        return res.status(400).send({ status: false, msg: err.message })
    }

}

//-------------------------------- get blogs by get/blogs-------------------------------
const filteredBlogs=async function (req,res){
    try{
        let filters = req.query;
       
        if(filters.authorId) {
           
            if(!validObjectId(filters.authorId))
            return res.send({msg:"authorId is not valid"});
        }
        if (keysLength(filters)) {

        let filterBolg=await blogsModel.find({"isDeleted":false,"isPublished":true})
        if(filterBolg.length===0)
        return res.status(404).send({status:false,msg:""})
        return res.status(200).send({status:true,data:filterBolg})
        }
        if (!keysLength(filters)) {
            
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


//------------------------- update the blogs put/blogs/:blogId--------------------------------
const updateBlogs = async function (req, res) {
    try {
        const blogId = req.params.blogId;
        const blogData = req.body;

    if (keysLength(blogData)) return res.status(404).send({ status: false, msg: "Body is required" });
    if(!blogId) return res.status(400).send({msg:"blogId is required"})
    if (!validObjectId(blogId)) return res.status(400).send("blogId is invalid")
    let blog = await blogsModel.findOneAndUpdate({ _id: blogId, isDeleted: false },
            {
                $set: { isPublished: true, body: blogData.body, title: blogData.title, publishedAt: new Date() },
                $push: { tags: blogData.tags, subcategory: blogData.subcategory }
            },
            { new: true });

        if (!blog)
        return res.status(404).send({ status: false, msg: "blog is not present" })
        return res.status(200).send({ status: true, data: blog });

    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, Error: error.message })
    }

}



//------------------- delete blogs using blogId delete/blogs/:blogId--------------------------------
const deleteBlogsById = async function (req, res) {

    let Id = req.params.blogId;
    if(!Id) return res.send("blogId must be required")
    if (!validObjectId(Id)) return res.send("blogId is incorrect")

    let blog1 = await blogsModel.findById(Id)
    if (blog1.isDeleted == true) return res.status(404).send()

    let Blog = await blogsModel.findByIdAndUpdate(Id, { $set: { isDeleted: true, deletedAt: new Date() } },{new:true});
    if (!Blog) {
        return res.status(404).send();

    }
    return res.status(200).send()

}

// --------------- delete blogs by query delete/blogs----------------------------------------
const deleteByquery = async function (req, res) {
    try {
        let data = req.query
        if (keysLength(data))
            return res.status(404).send({ status: false, msg: "please enter any query" });

            if (!Object.values(data).some(v => v))return res.status(404).send({ status: false, msg: "need value" });

        if (!data) return res.send("userId  is not writen")


        if (req.query.authorId) {
            const data = req.query.authorId

           
            if (!data && req.query.authorId == null) return res.send("userId  is not writen")

            if (!validObjectId(Id)) return res.send("blogId is not valid")
        }
       
        
        const blogUpdate = await blogsModel.find(data).updateMany({ isDeleted: true, deletedAt: new Date() })

        if (blogUpdate.length == 0) return res.send({ status: false, msg: "no data found" })
        return res.send(blogUpdate)

    } catch (err) {
        return res.status(400).send({ status: false, msg: err.message })
    }

}




// exporting all the functions here

module.exports = { createBlog, updateBlogs, deleteByquery, deleteBlogsById,filteredBlogs }
