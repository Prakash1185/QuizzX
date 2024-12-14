import { Router } from 'express';
import { addQuizAttempted, calculateScore, createAccount, deleteUserById, getLeaderboard, getScore, getUserById, getUsers, storeSelectedOptions, updateScore, updateUserById } from '../../controllers/v1/userController.js';
import { createAccountValidator } from '../../validation/v1/userValidator.js';
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
userRouter.put('/:userId/store-options', storeSelectedOptions);
userRouter.put('/add-quiz/:quizId', addQuizAttempted);

// Delete routes
userRouter.delete('/:userId', deleteUserById);

// Calculate score route
userRouter.put('/:userId/calculate-score/:quizId', calculateScore);

export default userRouter;