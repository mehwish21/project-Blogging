const express = require('express');
const router = express.Router();
const authorController=require('../controller/authorController');
const blogController=require("../controller/blogController")
const mid=require("../middleware/auth")

router.post('/authors', authorController.createAuthor);

router.post("/blogs", blogController.createBlog)
router.put("/blogs/:blogId",mid.authentication,mid.authorisation, blogController.updateBlogs);

router.delete("/blogs/:blogId",mid.authentication,mid.authorisation,blogController.deleteBlogsById)
router.delete('/blogs',mid.authentication, blogController.deleteByquery)
router.get("/blogs",mid.authentication, blogController.filteredBlogs)


router.post("/login",authorController.authorLogin)

//router.delete("/trymid/:blogId",mid.authorisation, blogController.trymid )



module.exports=router; 

