import express from 'express'
import { registerUser , loginUser , getUserById, verifyToken, hitApi} from '../controllers/user.controller.js'

const router = express.Router();

router.post("/register" , registerUser);
router.post("/login" , loginUser);
router.get("/:id" , getUserById)
router.post("/verify",verifyToken)
router.get("/api" , hitApi)

export default router;