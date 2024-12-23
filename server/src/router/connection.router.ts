import express from 'express'
import authMiddleware from '../middleware/auth.middleware';
import connectionController from '../controller/connection.controller';

const router = express.Router();

router.get('', authMiddleware.verifyUserAccess, connectionController.getAllConnectionRequest);
router.get('/exist/:recipientId', authMiddleware.verifyUserAccess, connectionController.getConnectionExist);


router.post('/send/:recipientId', authMiddleware.verifyUserAccess, connectionController.sendConnectionRequest);
router.post('/accept/:connectionId', authMiddleware.verifyUserAccess, connectionController.acceptConnectionRequest);
router.post('/reject/:connectionId', authMiddleware.verifyUserAccess, connectionController.rejectConnectionRequest);

export default router;