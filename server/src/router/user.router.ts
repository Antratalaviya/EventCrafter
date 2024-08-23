import express from 'express'
import authMiddleware from '../middleware/auth.middleware';
import userController from '../controller/user.controller';

const router = express.Router();

router.get('/profile',
    authMiddleware.verifyUserAccess,
    userController.getUserProfile
)

export default router;