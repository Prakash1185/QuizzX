import { Router } from 'express';
import { createQuestion, createQuiz, deleteQuestion, deleteQuiz, getAllQuizzes, getAllQuizzesForUser, getQuestionById, getQuizById, getQuizQuestionsById, getQuizQuestionsByIdForUsers, getQuizStatus, updateIsEntryStatus, updateQuestion, updateQuiz, updateShowLeaderboardStatus } from '../../controllers/v1/quizController.js';
import { QuizValidator } from '../../validation/v1/quizValidatior.js';
import adminMiddleware from '../../middlewares/v1/adminMiddleware.js';
import authMiddleware from '../../middlewares/v1/authMiddleware.js';
import { addUserToAttendes, getAttendesDetails, getUsersByQuizId } from '../../controllers/v1/userController.js';
const quizRouter = Router();

// Create routes
quizRouter.post('/create-quiz', adminMiddleware, QuizValidator, createQuiz);
quizRouter.post('/:quizId/add-question', adminMiddleware, createQuestion);

// Read routes
quizRouter.get('/all-quizzes', adminMiddleware, getAllQuizzes);
quizRouter.get('/user-quizzes', getAllQuizzesForUser);
quizRouter.get('/:quizId/questions', authMiddleware, getQuizQuestionsByIdForUsers);
quizRouter.get('/:quizId/questions/admin', adminMiddleware, getQuizQuestionsById);
quizRouter.get('/question/:questionId', authMiddleware, getQuestionById);
quizRouter.get('/question/:questionId/admin', adminMiddleware, getQuestionById);
quizRouter.get('/:quizId', adminMiddleware, getQuizById);
quizRouter.get('/:quizId/status',  getQuizStatus);



// Update routes
quizRouter.put('/update-quiz/:quizId', adminMiddleware, updateQuiz);
quizRouter.put('/:quizId/update-attendee', authMiddleware, addUserToAttendes);
quizRouter.put('/:quizId/update-question/:questionId', adminMiddleware, updateQuestion);
// quizRouter.put('/update-status/:quizId', adminMiddleware, updateQuizStatus);
quizRouter.put('/update-entry/:quizId', adminMiddleware, updateIsEntryStatus);
quizRouter.put('/update-leaderboard-status/:quizId', adminMiddleware, updateShowLeaderboardStatus);

// Delete routes
quizRouter.delete('/delete-quiz/:quizId', adminMiddleware, deleteQuiz);
quizRouter.delete('/delete-question/:questionId', adminMiddleware, deleteQuestion);

export default quizRouter;