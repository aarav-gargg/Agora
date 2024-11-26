import express from 'express'
import { createComment, getCommentsForBlog } from '../controllers/comments.controller.js';
import { authenticate } from '../controllers/user.controller.js';


const router = express.Router();

router.post("/create" , authenticate , createComment)
router.post("/get" , getCommentsForBlog)

export default router;