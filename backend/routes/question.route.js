import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createQuestion, deleteQuestion, getQuestions, getQuestion, updateQuestion, voteQuestion, viewQuestion, answerQuestion } from '../controllers/question.controller.js';

const router = express.Router();

router.post('/create', verifyToken, createQuestion);
router.get('/getquestions', getQuestions);
router.get('/getquestion/:questionId', getQuestion);
router.delete('/deletequestion/:questionId/:userId', verifyToken, deleteQuestion);
router.put('/updatequestion/:questionId/:userId', verifyToken, updateQuestion);
router.post('/votequestion/:questionId', voteQuestion);
router.post('/viewquestion/:questionId', viewQuestion);
router.post('/answerquestion/:questionId', verifyToken, answerQuestion);

export default router;