import express from 'express'
import { createBlog } from '../controllers/blog.controller.js'
import { authenticate } from '../controllers/user.controller.js'

const router = express.Router();

router.post("/create" , authenticate , createBlog);

export default router;