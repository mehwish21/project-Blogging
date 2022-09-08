const express = require('express');
const router = express.Router();
const authorController=require('../controller/authorController');
const blogController=require("../controller/blogController")
const {authentication,authorisation}=require("../middleware/auth")

router.post('/authors', authorController.createAuthor);
router.post("/blogs",authentication, blogController.createBlog)
router.get("/blogs",authentication, blogController.filteredBlogs)
router.put("/blogs/:blogId",authentication,authorisation, blogController.updateBlogs);

router.delete("/blogs/:blogId",authentication,authorisation,blogController.deleteBlogsById)
router.delete('/blogs',authentication, blogController.deleteByquery)



router.post("/login",authorController.authorLogin)




module.exports=router; 

