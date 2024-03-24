import express from "express";
import { signin, signup } from '../controllers/auth.controller.js';
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post('/signup',signup);
router.post('/signin',signin);
router.post('/verify', verifyToken, (req,res) =>{
    res.status(200).json({ message: 'Token verified successfully' });
});

export default router;