const express = require('express');
const router = express.Router();
const authorController=require('../controller/authorController');
const blogController=require("../controller/blogController")
const {authentication,authorisation, authorisation1}=require("../middleware/auth")
const blogsModel=require('../model/blogsModel')

router.post('/authors', authorController.createAuthor);
router.post("/blogs",authentication, blogController.createBlog)
router.get("/blogs",authentication, blogController.filteredBlogs)
router.put("/blogs/:blogId",authentication,authorisation, blogController.updateBlogs);

router.delete("/blogs/:blogId",authentication,authorisation,blogController.deleteBlogsById)
router.delete('/blogs',authentication,authorisation1, blogController.deleteBlogByQuery)


router.put('/undo',async function(req, res){
  await blogsModel.find({isDeleted: true}).updateMany( {isDeleted: false, deleteAt: null})
  res.send("done") 
 })
 
router.post("/login",authorController.authorLogin)

router.all("/*", function (req, res) {
    res.status(404).send({ status: false, message: "invalid http request" });
  });

 

module.exports=router; 

