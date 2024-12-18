import { Router } from 'express';
import { addQuizAttempted, calculateScore, createAccount, deleteUserById, getLeaderboard, getScore, getUserById, getUsers, storeSelectedOptions, updateScore, updateUserById } from '../../controllers/v1/userController.js';
import { createAccountValidator } from '../../validation/v1/userValidator.js';
import authMiddleware from '../../middlewares/v1/authMiddleware.js';
import verifyUserId from '../../middlewares/v1/verifyUserIdMiddleware.js';
const userRouter = Router();

// create Routes
userRouter.post('/create-account', createAccountValidator, createAccount);

// Read routes
userRouter.get('/users', getUsers);
userRouter.get('/:userId', getUserById);
userRouter.get('/:userId/score', getScore);
userRouter.get('/:quizId/leaderboard', getLeaderboard);

// Update routes
userRouter.put('/:userId', updateUserById);
userRouter.put('/:userId/score', updateScore);
userRouter.put('/:quizId/store-options',authMiddleware,verifyUserId ,storeSelectedOptions);
userRouter.put('/add-quiz/:quizId', addQuizAttempted);

// Delete routes
userRouter.delete('/:userId', deleteUserById);

// Calculate score route
userRouter.put('/calculate-score/:quizId', calculateScore);

export default userRouter;