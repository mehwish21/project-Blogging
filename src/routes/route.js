//----------------------------------------Importing---------------------------------------------

const express = require('express');
const router = express.Router();
const authorController=require('../controller/authorController');
const blogController=require("../controller/blogController")
const {authentication,authorisation, authorisation1}=require("../middleware/auth")

//----------------------------------------Creating APIs---------------------------------------------

router.post('/authors', authorController.createAuthor);
router.post("/blogs",authentication, blogController.createBlog)
router.get("/blogs",authentication, blogController.filteredBlogs)
router.put("/blogs/:blogId",authentication,authorisation, blogController.updateBlogs);
router.delete("/blogs/:blogId",authentication,authorisation,blogController.deleteBlogsById)
router.delete('/blogs',authentication,authorisation1, blogController.deleteBlogByQuery)
router.post("/login",authorController.authorLogin)

router.all("/*", function (req, res) {
    res.status(404).send({ status: false, message: "invalid http request" });
  });

 
//------------------------------------- exporting all the router here---------------------------------

module.exports=router; 

