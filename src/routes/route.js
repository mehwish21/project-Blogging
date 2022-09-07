const express = require('express');
const router = express.Router();
const authorController=require('../controller/authorController');
const blogController=require("../controller/blogController")
const{authentication}=require("../middleware/auth")

router.post('/authors', authorController.createAuthor);

router.post("/blogs",blogController.createBlog)
router.put("/blogs",blogController.updateBlogs);
router.delete("/blogs/:blogId",blogController.deleteBlogsById)
router.delete('/blogs', blogController.deleteByquery)
router.get("/blogs",blogController.filteredBlogs)


router.post("/login",authorController.authorLogin)

module.exports=router; 

