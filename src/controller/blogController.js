
//--------------------importing modules-------------------------------------
const authorModel = require("../model/authorModel");
const blogsModel = require("../model/blogsModel");
const { validObjectId, typeValid, isString, isNotEmpty, keysLength, validBoolean } = require('../Validation/validator');


//------------------------ creation of blogs post/blogs----------------------
const createBlog = async function (req, res) {
    try {
        let blog = req.body;
        let { title, body, category, subcategory, tag, isPublished } = blog
        if (!keysLength(blog)) return res.status(400).send({ status: false, msg: "blog details required" });
        let authorId = req.body.authorId;

        // Title validation
        if (!title) return res.status(400).send({ status: false, msg: "title is required" });
        if (!isString(title)) return res.status(400).send({ msg: "Type of title  must be string" });
        if (!isNotEmpty(title)) return res.status(400).send({ msg: "title is empty" })
        title = title.trim();


        // validation of body
        if (!body) return res.status(400).send({ status: false, msg: "body is required" });
        if (!isString(body)) return res.status(400).send({ status: false, msg: "Type of body must be string" });
        if (!isNotEmpty(body)) return res.status(400).send({ msg: "body is empty" })
        body = body.trim();


        //validation of authorId 
        if (!authorId) return res.status(400).send({ status: false, msg: "authorId is required" });
        authorId = authorId.trim();
        if (!validObjectId(authorId)) return res.status(400).send({ msg: "authorId is not valid" })

        //validation of category//
        if (!category) return res.status(400).send({ status: false, msg: "category is required" });
        if (!isString(category)) return res.status(400).send({ status: false, msg: "Type of category must be string" });
        if (!isNotEmpty(category)) return res.status(400).send({ msg: "category is empty" })
        category = category.trim();

        if (Object.keys(blog).some(t => t == "tag")) {

            if (!typeValid(tag)) return res.status(400).send({ status: false, msg: "Incorrect type of tags" });
            if (tag.length == 0) return res.status(400).send({ status: false, msg: "empty" });

            for (let i = 0; i < tag.length; i++) {
                if (typeof tag[i] !== "string") return res.status(400).send({ msg: "Plese enter tags in string format" })
                if (!isNotEmpty(tag[i])) return res.status(400).send({ msg: "tag is empty" });
            }
            tag = tag.map(a => a.trim()) //check the type of each tag element
        }


        if (Object.keys(blog).some(t => t == "subcategory")) {

            if (!typeValid(subcategory)) return res.status(400).send({ status: false, msg: "Incorrect type of subcategory" });
            if (subcategory.length == 0) return res.status(400).send({ status: false, msg: "subcategory is empty" });

            for (let i = 0; i < subcategory.length; i++) {
                if (typeof subcategory[i] !== "string") return res.status(400).send({ msg: "Plese enter subcategory in string format" })
                if (!isNotEmpty(subcategory[i])) return res.status(400).send({ msg: "subcategory value is empty" });
            }
            subcategory = subcategory.map(a => a.trim()) //check the type of each tag element
        }


        if (Object.keys(blog).some(t => t == "isPublished")) {
            if (!validBoolean(isPublished)) return res.status(400).send({ msg: "Plese enter only true or false" })
            if (isPublished === true) blog.publishedAt = new Date()
        }


        //find authorId in athorModel

        let authId = await authorModel.findOne({ _id: authorId });

        // check given authId is present in the author document or not
        if (!authId) return res.status(404).send({ status: false, msg: "authot not found" })

        const blogCreated = await blogsModel.create(blog);
        return res.status(201).send({ status: true, data: blogCreated });

    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }

}

//-------------------------------- get blogs by get/blogs-------------------------------
const filteredBlogs = async function (req, res) {
    try {
        let filters = req.query;
        filters.isDeleted = false
        filters.isPublished = true

        //filter.isDeleted= false and filters.isPublished {authorId : kalsjdflkajd, }
        if (Object.keys(filters).some(a => a == "authorId")) {

            if (!filters.authorId) return res.status(400).send("provide authorid")
            if (!validObjectId(filters.authorId)) return res.status(400).send({ msg: "authorId is not valid" });
        }


        const getBlogs = await blogsModel.find(filters)

        if (getBlogs.length == 0) return res.status(404).send({ status: false, msg: "No data found" })
        return res.status(200).send({ status: true, data: getBlogs })

    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }


}


//------------------------- update the blogs put/blogs/:blogId--------------------------------

const updateBlogs = async function (req, res) {
    try {
        const blogId = req.params.blogId;
        let blogData = req.body;
        let { title, body, category, subcategory, tag, isPublished, publishedAt } = blogData

        if (!keysLength(blogData)) return res.status(404).send({ status: false, msg: "Body is required" });

        if (Object.keys(blogData).some(a => a == "title")) {
            if (!title) return res.status(400).send({ status: false, msg: "title is required" });
            if (!isString(title)) return res.status(400).send({ msg: "Type of title  must be string" });
            if (!isNotEmpty(title)) return res.status(400).send({ msg: "title is empty" })
            title = title.trim();
        }


        if (Object.keys(blogData).some(a => a == "category")) {
            if (!category) return res.status(400).send({ status: false, msg: "category is required" });
            if (!isString(category)) return res.status(400).send({ status: false, msg: "Type of category must be string" });
            if (!isNotEmpty(category)) return res.status(400).send({ msg: "category is empty" })
            category = category.trim();
        }



        if (!blogId) return res.status(400).send({ status: false, msg: "blogId is required" })
        if (!validObjectId(blogId)) return res.status(400).send({ msg: "blogId is invalid" })

        if (Object.keys(blogData).some(a => a == "body")) {
            if (!body) return res.status(400).send({ status: false, msg: "plese provid some data in body" })
            if (!isString(body)) return res.status(400).send({ status: false, msg: "plese provid data in string" })
            if (!isNotEmpty(body)) return res.status(400).send({ msg: "body is empty" })
            body = body.trim();
        }

        if (Object.keys(blogData).some(t => t == "tag")) {

            if (!typeValid(blogData.tag)) return res.status(400).send({ status: false, msg: "Incorrect type of tags" });
            if (tag.length == 0) return res.status(400).send({ status: false, msg: "tag empty" });

            for (let i = 0; i < tag.length; i++) {
                if (typeof tag[i] !== "string") return res.status(400).send({ msg: "Plese enter tags in string format" })
                if (!isNotEmpty(tag[i])) return res.status(400).send({ msg: "tag is empty" });
            }
            tag = tag.map(a => a.trim()) //check the type of each tag element
        }

        
        if (Object.keys(blogData).some(t => t == "subcategory")) {

            if (!typeValid(subcategory)) return res.status(400).send({ status: false, msg: "Incorrect type of subcategory" });
            if (subcategory.length == 0) return res.status(400).send({ status: false, msg: "subcategory is empty" });

            for (let i = 0; i < subcategory.length; i++) {
                if (typeof subcategory[i] !== "string") return res.status(400).send({ msg: "Plese enter subcategory in string format" })
                if (!isNotEmpty(subcategory[i])) return res.status(400).send({ msg: "subcategory is empty" });
            }
            subcategory = subcategory.map(a => a.trim()) //check the type of each tag element
        }

        if (Object.keys(blogData).some(t => t == "isPublished")) {
            if (!validBoolean(isPublished)) return res.status(400).send({ msg: "Plese enter only true or false" })
            if (isPublished === true) publishedAt = new Date()
        }


        let blog = await blogsModel.findOneAndUpdate({ _id: blogId, isDeleted: false },
            {
                $set: { isPublished: isPublished, body: body, title: title, publishedAt: publishedAt, category: category },
                $push: { tag: tag, subcategory: subcategory }
            },
            { new: true });

        if (!blog) return res.status(404).send({ status: false, msg: "blog is not found" })

        return res.status(200).send({ status: true, data: blog });

    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, Error: error.message })
    }

}



//------------------- delete blogs using blogId delete/blogs/:blogId--------------------------------
const deleteBlogsById = async function (req, res) {
    try {
        let data = req.params;
        let Id = data.blogId

        let blog1 = await blogsModel.findById(Id)
        if (blog1.isDeleted == true) return res.status(404).send({ status: false, msg: "Blog is alredy deleted" })

        let Blog = await blogsModel.findByIdAndUpdate(Id, { $set: { isDeleted: true, deletedAt: new Date() } }, { new: true });
        if (!Blog) {
            return res.status(404).send({ status: false, msg: "Blog not found" });

        }
        return res.status(200).send()
    } catch (err) {
        return res.status(400).send({ status: false, msg: err.message })
    }

}

// --------------- delete blogs by query delete/blogs----------------------------------------

const deleteBlogByQuery = async function (req, res) {
    try {

        let ids = req.validBlogId

        let blogs = await blogsModel.find({ _id: { $in: ids } }).updateMany({ isDeleted: true, deleteAt: Date.now() })

        return res.status(200).send({ status: true, data: blogs })

    } catch (err) {
        console.log(err)
        return res.status(500).send({ status: false, msg: err.message })
    }
}



// exporting all the functions here

module.exports = { createBlog, updateBlogs, deleteBlogByQuery, deleteBlogsById, filteredBlogs }
