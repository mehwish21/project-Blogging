const authorModel = require("../model/authorModel");
const blogsModel = require("../model/blogsModel");
const mongoose = require('mongoose')



const createBlog = async function (req, res) {
    try {
        let blog = req.body;
        let authorId = req.body.authorId;

        if (!authorId)
            return res.status(400).send({ status: false, msg: "" })



        const createBlog = async function (req, res) {
            try {
                let blog = req.body;
                let authorId = req.body.authorId;

                if (!authorId)
                    return res.status(400).send({ status: false, msg: "" })


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





       

        const deleteByquery = async function (req, res) {
            try {
                if (req.query.authorId) {
                    const data = req.query.authorId

                    let authorId = mongoose.Types.ObjectId.isValid(data)
                    if (!data && req.query.authorId == null) return res.send("userId  is not writen")

                    if (authorId == false) return res.send("authorId  is incorrect")
                }
                let data = req.query
                // if(data==null)return res.send("no filter added")
                const blogUpdate = await blogsModel.find(data).updateMany({ isDeleted: true, deletedAt: new Date() })

                if (blogUpdate.length == 0) return res.send({ status: false, msg: "no data found" })
                return res.send(blogUpdate)

            } catch (err) {
                return res.status(400).send({ status: false, msg: err.message })
            }

        }
        module.exports = { createBlog, updateBlogs ,deleteByquery};
