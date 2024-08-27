import express from 'express'
import authMiddleware from '../middleware/auth.middleware';
import eventController from '../controller/event.controller';

const router = express.Router();

router.post('/', authMiddleware.verifyUserAccess, eventController.createEvent)

router.get('/', authMiddleware.verifyUserAccess, eventController.getAllEvents);
router.get('/own', authMiddleware.verifyUserAccess, eventController.getOwnEvents);
router.get('/:eventId', authMiddleware.verifyUserAccess, eventController.getFullEvent);


router.post('/like/:eventId', authMiddleware.verifyUserAccess, eventController.likeEvent);
router.post('/save/:eventId', authMiddleware.verifyUserAccess, eventController.saveEvent);

router.get('/invitations', authMiddleware.verifyUserAccess, eventController.getAllInvitation);
router.get('/send/invitations/:eventId', authMiddleware.verifyUserAccess, eventController.getAllSendParticipants);
router.post('/invite', authMiddleware.verifyUserAccess, eventController.sendInvitation);
router.post('/invite/accept/:invitationId', authMiddleware.verifyUserAccess, eventController.acceptInvitation);
router.post('/invite/reject/:invitationId', authMiddleware.verifyUserAccess, eventController.rejectInvitation);
router.post('/cancel/:eventId', authMiddleware.verifyUserAccess, eventController.cancelEvent);  //to test

router.get('/participants/:eventId', authMiddleware.verifyUserAccess, eventController.getAllParticipants);



export default router;

/**
 * {
    "type":"private",
    "category":"birthday party",
    "title":"birthday party",
    "subtitle1":"sub1",
    "subtitle2":"sub2",
    "offers": [
        "food"
    ],
    "street":"abc",
    "city":"surat",
    "country":"india",
    "carCapacity":"20",
    "startDate":"2024-08-24",
    "endDate":"2024-08-30",
    "startTime":"05:00",
    "endTime":"13:00",
    "photos":[
        {
            "url":"abc"
        }
    ],
    "pdfFile" : [{
        "url":"abc"
    }],
    "description":"abc"
}
 */