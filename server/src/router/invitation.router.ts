import express from 'express'
import authMiddleware from '../middleware/auth.middleware';
import invitationController from '../controller/invitation.controller';

const router = express.Router();

router.get('', authMiddleware.verifyUserAccess, invitationController.getAllInvitation)

router.get('/sent', authMiddleware.verifyUserAccess, invitationController.getAllSentInvitation)

router.get('/received', authMiddleware.verifyUserAccess, invitationController.getAllReceivedInvitation)

router.get('/sent/:eventId', authMiddleware.verifyUserAccess, invitationController.getAllSentInvitationOfEvent);

router.post('/send', authMiddleware.verifyUserAccess, invitationController.sendInvitation);

router.post('/accept/:invitationId', authMiddleware.verifyUserAccess, invitationController.acceptInvitation);

router.post('/reject/:invitationId', authMiddleware.verifyUserAccess, invitationController.rejectInvitation);

export default router;