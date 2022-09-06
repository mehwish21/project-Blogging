const authorModel = require("../model/authorModel");
const blogsModel = require("../model/blogsModel");
const mongoose = require('mongoose')


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



















const deleteBlogsById = async function (req, res) {

    let Id = req.params.blogId


    let blogId = mongoose.Types.ObjectId.isValid(Id)
    if (blogId == false) return res.send("blogId is incorrect")

    let blog1 = await blogsModel.findById(Id)
    if (blog1.isDeleted == true) return res.status(404).send()

    let Blog = await blogsModel.findByIdAndUpdate(Id, { $set: { isDeleted: true, deletedAt: new Date() } });
    if (!Blog) {
        return res.status(404).send();

    }
    return res.status(200).send()

}























module.exports.createBlog = createBlog;
module.exports.deleteBlogsById = deleteBlogsById