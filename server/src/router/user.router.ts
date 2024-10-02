import express from 'express'
import authMiddleware from '../middleware/auth.middleware';
import userController from '../controller/user.controller';
// import cacheData from '../cache/cacheData';

const router = express.Router();

router.get('/', authMiddleware.verifyUserAccess, userController.getAllUsers)
// router.get('/profile', authMiddleware.verifyUserAccess, cacheData.userProfile, userController.getUserProfile)
router.get('/profile', authMiddleware.verifyUserAccess, userController.getUserProfile)

router.get('/saved', authMiddleware.verifyUserAccess, userController.savedEventsByUser)
router.get('/liked', authMiddleware.verifyUserAccess, userController.likedEventsByUser)

router.get('/notifications', authMiddleware.verifyUserAccess, userController.getAllNotification)

router.get('/:userId', authMiddleware.verifyUserAccess, userController.getUserById)

router.post('/notifications/read', authMiddleware.verifyUserAccess, userController.readAllNotification)
//send request to connect
/**
 * //get all pending request
 * time
 * name + surname of sender
 * profileImg 
 * 
 */
//accept request
//reject request

//get all frind whome with accepted request and vice-versa
/**
 * name+surname of sender
 * profileImg
 */


router.get('/subscribe/:subscribedToId', authMiddleware.verifyUserAccess, userController.subscribeUser)

router.get('/friends', authMiddleware.verifyUserAccess, userController.getAllFriends);

router.get('/participants/:eventId', authMiddleware.verifyUserAccess, userController.getEventParticipants);

router.put('/edit/avatar', authMiddleware.verifyUserAccess, userController.updateUserAvatar);

router.put('/edit/profile-image', authMiddleware.verifyUserAccess, userController.updateUserProfileImage);

router.put('/edit/profile', authMiddleware.verifyUserAccess, userController.updateUserProfile);

router.put('/edit/email', authMiddleware.verifyUserAccess, userController.updateUserEmail);

router.delete('/delete/account', authMiddleware.verifyUserAccess, userController.deleteUserAccount);

export default router;