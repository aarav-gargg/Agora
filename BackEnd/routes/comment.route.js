import express from 'express'
import { createComment } from '../controllers/comments.controller.js';
import { authenticate } from '../controllers/user.controller.js';


const router = express.Router();

router.post("/create" , authenticate , createComment)

export default router;