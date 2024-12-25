import { Router } from 'express';
import { addQuizAttempted, calculateScore, createAccount, deleteAllUsers, deleteAllUsersByQuizId, deleteUserById, getAttendesDetails, getScore, getUserById, getUsers, getUsersByQuizId, storeSelectedOptions, updateScore, updateUserById } from '../../controllers/v1/userController.js';
import { createAccountValidator } from '../../validation/v1/userValidator.js';
import authMiddleware from '../../middlewares/v1/authMiddleware.js';
import verifyUserId from '../../middlewares/v1/verifyUserIdMiddleware.js';
import adminMiddleware from '../../middlewares/v1/adminMiddleware.js';
const userRouter = Router();

// create Routes
userRouter.post('/create-account', createAccountValidator, createAccount);

userRouter.delete('/delete', adminMiddleware, deleteAllUsers);

userRouter.delete("/users/delete-by-quiz/:quizId", adminMiddleware, deleteAllUsersByQuizId);

// Read routes
userRouter.get('/users', adminMiddleware, getUsers);
userRouter.get('/:userId', getUserById);
userRouter.get('/:userId/score', adminMiddleware, getScore);
userRouter.get('/:quizId/attendes', adminMiddleware, getAttendesDetails);
userRouter.get('/:quizId/users', getUsersByQuizId);
// userRouter.get('/:quizId/leaderboard', getLeaderboard);
// userRouter.get('/:quizId/leaderboard', getLeaderboard);

// Update routes
userRouter.put('/:userId', adminMiddleware, updateUserById);
userRouter.put('/:userId/score', adminMiddleware, updateScore);
userRouter.put('/:quizId/store-options', authMiddleware, verifyUserId, storeSelectedOptions);
userRouter.put('/add-quiz/:quizId', addQuizAttempted);

// Delete routes

userRouter.delete('/:userId', adminMiddleware, deleteUserById);

// Calculate score route
userRouter.put('/calculate-score/:quizId', calculateScore);

export default userRouter;