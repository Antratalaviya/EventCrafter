import express from 'express'
import authMiddleware from '../middleware/auth.middleware';
import userController from '../controller/user.controller';
import cacheData from '../cache/cacheData';

const router = express.Router();

router.get('/', authMiddleware.verifyUserAccess, userController.getAllUsers)
router.get('/profile', authMiddleware.verifyUserAccess, cacheData.userProfile, userController.getUserProfile)

router.get('/saved', authMiddleware.verifyUserAccess, userController.savedEventsByUser)
router.get('/liked', authMiddleware.verifyUserAccess, userController.likedEventsByUser)

router.get('/notifications', authMiddleware.verifyUserAccess, userController.getAllNotification)
//get all pending
/**
 * name+surname of sender
 * profileImg
 * title
 * sDate
 * sTime
 * type
 */
router.get('/invitations', authMiddleware.verifyUserAccess, userController.getAllInvitation)

//not pending

/**
 * // sent invitation
 * profileImg
 * name + surname of receiver
 * event title
 * start date
 * start time
 * event type
 */

/**
 * //received invitation
 * * name+surname of sender
 * profileImg
 * title
 * sDate
 * sTime
 * type
 */

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


//update profile
//update avatar
//update profileImg
//update notification isRead
//delete account
//change email id

router.get('/subscribe/:subscribedToId', authMiddleware.verifyUserAccess, userController.subscribeUser)

router.post('/edit/avatar', authMiddleware.verifyUserAccess, userController.updateUserAvatar);

export default router;