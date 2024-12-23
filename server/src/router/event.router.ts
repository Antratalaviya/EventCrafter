import express from 'express'
import authMiddleware from '../middleware/auth.middleware';
import eventController from '../controller/event.controller';
import bookEventController from '../controller/book.event.controller';
// import cacheData from '../cache/cacheData';

const router = express.Router();


// router.get('/', authMiddleware.verifyUserAccess, cacheData.allEvents, eventController.getAllEvents);
router.get('/', authMiddleware.verifyUserAccess, eventController.getAllEvents);
// router.get('/own', authMiddleware.verifyUserAccess, cacheData.ownEvents, eventController.getOwnEvents);
router.get('/own', authMiddleware.verifyUserAccess, eventController.getOwnEvents);
router.get('/own/public/:userId', authMiddleware.verifyUserAccess, eventController.getOwnPublicEvents);
router.get('/:eventId', authMiddleware.verifyUserAccess, eventController.getFullEvent);
router.get('/participants/:eventId', authMiddleware.verifyUserAccess, eventController.getAllParticipants);


router.post('/', authMiddleware.verifyUserAccess, eventController.createEvent)
router.post('/like/:eventId', authMiddleware.verifyUserAccess, eventController.likeEvent);
router.post('/save/:eventId', authMiddleware.verifyUserAccess, eventController.saveEvent);
router.post('/cancel/:eventId', authMiddleware.verifyUserAccess, eventController.cancelEvent);
router.post('/book', authMiddleware.verifyUserAccess, bookEventController.bookEvent);


router.put('/status', authMiddleware.verifyUserAccess, eventController.updateEventStatus);
router.put('/status/:eventId', authMiddleware.verifyUserAccess, eventController.eventPaymentDone);
router.put('/:eventId', authMiddleware.verifyUserAccess, eventController.updateEvent);

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