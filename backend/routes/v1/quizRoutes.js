import { Router } from 'express';
import { createQuestion, createQuiz, deleteQuestion, deleteQuiz, getAllQuizzes, getAllQuizzesForUser, getQuestionById, getQuizById, getQuizQuestionsById, updateQuestion, updateQuiz, updateQuizStatus } from '../../controllers/v1/quizController.js';
import { QuizValidator } from '../../validation/v1/quizValidatior.js';
const quizRouter = Router();

// Create routes
quizRouter.post('/create-quiz', QuizValidator, createQuiz);
quizRouter.post('/:quizId/add-question', createQuestion);

// Read routes
quizRouter.get('/all-quizzes', getAllQuizzes);
quizRouter.get('/user-quizzes', getAllQuizzesForUser);
quizRouter.get('/:quizId/questions', getQuizQuestionsById);
quizRouter.get('/question/:questionId', getQuestionById);
quizRouter.get('/quiz/:quizId', getQuizById);

// Update routes
quizRouter.put('/update-quiz/:quizId', updateQuiz);
quizRouter.put('/update-question/:questionId', updateQuestion);
quizRouter.put('/update-status/:quizId', updateQuizStatus);

// Delete routes
quizRouter.delete('/delete-quiz/:quizId', deleteQuiz);
quizRouter.delete('/delete-question/:questionId', deleteQuestion);

export default quizRouter;