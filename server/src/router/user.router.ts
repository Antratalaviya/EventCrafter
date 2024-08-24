import express from 'express'
import authMiddleware from '../middleware/auth.middleware';
import userController from '../controller/user.controller';

const router = express.Router();

router.get('/profile', authMiddleware.verifyUserAccess, userController.getUserProfile)
router.get('/saved', authMiddleware.verifyUserAccess, userController.savedEventsByUser)
router.get('/liked', authMiddleware.verifyUserAccess, userController.likedEventsByUser)
router.get('/notifications', authMiddleware.verifyUserAccess, userController.getAllNotification)//recipients info to sent
router.get('/invitations', authMiddleware.verifyUserAccess, userController.getAllInvitation)  //recipients information to sent

router.get('/subscribe/:subscribedToId', authMiddleware.verifyUserAccess, userController.subscribeUser) //to test

//get users liked events
//get users saved events


export default router;