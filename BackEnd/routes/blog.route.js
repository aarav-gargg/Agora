import express from 'express'
import { createBlog , getAllBlogs , getBlogById , getUserBlogs , updateBlog , deleteBlog } from '../controllers/blog.controller.js'
import { authenticate } from '../controllers/user.controller.js'

const router = express.Router();

router.post("/create" , authenticate , createBlog);
router.put("/update/:id" , authenticate , updateBlog);
router.get("/all" , getAllBlogs);
router.get("/userBlog" , authenticate , getUserBlogs);
router.post("/blogByID/:id" , authenticate , getBlogById);
router.delete("/delete/:id" , authenticate , deleteBlog);


export default router;