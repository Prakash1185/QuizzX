import { Router } from 'express';
import { createQuestion, createQuiz, deleteQuestion, deleteQuiz, getAllQuizzes, getAllQuizzesForUser, getQuestionById, getQuizById, getQuizQuestionsById, updateQuestion, updateQuiz, updateQuizStatus } from '../../controllers/v1/quizController.js';
import { QuizValidator } from '../../validation/v1/quizValidatior.js';
import adminMiddleware from '../../middlewares/v1/adminMiddleware.js';
import authMiddleware from '../../middlewares/v1/authMiddleware.js';
const quizRouter = Router();

// Create routes
quizRouter.post('/create-quiz', adminMiddleware,QuizValidator, createQuiz);
quizRouter.post('/:quizId/add-question', adminMiddleware,createQuestion);

// Read routes
quizRouter.get('/all-quizzes', adminMiddleware,getAllQuizzes);
quizRouter.get('/user-quizzes', authMiddleware,getAllQuizzesForUser);
quizRouter.get('/:quizId/questions', authMiddleware,getQuizQuestionsById);
quizRouter.get('/question/:questionId', authMiddleware,getQuestionById);
quizRouter.get('/quiz/:quizId', getQuizById);

// Update routes
quizRouter.put('/update-quiz/:quizId', adminMiddleware,updateQuiz);
quizRouter.put('/update-question/:questionId', adminMiddleware,updateQuestion);
quizRouter.put('/update-status/:quizId', adminMiddleware,updateQuizStatus);

// Delete routes
quizRouter.delete('/delete-quiz/:quizId', adminMiddleware,deleteQuiz);
quizRouter.delete('/delete-question/:questionId', adminMiddleware,deleteQuestion);

export default quizRouter;