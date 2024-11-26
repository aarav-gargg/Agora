import express from 'express'
import { createComment, deleteComment, getCommentsForBlog, updateComment } from '../controllers/comments.controller.js';
import { authenticate } from '../controllers/user.controller.js';


const router = express.Router();

router.post("/create" , authenticate , createComment)
router.post("/get" , getCommentsForBlog)
router.post("/delete/:commentId" , authenticate ,  deleteComment)
router.put("/update/:commentId" , authenticate , updateComment);

export default router;