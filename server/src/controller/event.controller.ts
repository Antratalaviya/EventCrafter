import { Request, Response } from "express";
import status from 'http-status';
import { ApiError, ApiResponse, asyncHandler } from "../utils/customUtilities";
import { EventInput } from "../constants";
import { AppString } from "../utils/appString";
import eventService from "../service/event.service";
import userService from "../service/user.service";
import notificationService from "../service/notification.service";
import invitationService from "../service/invitation.service";


const createEvent = asyncHandler(async (req: Request, res: Response) => {
    try {
        const user = req.user;
        const event: EventInput = req.body;

        let startDate = new Date(event.startDate)
        let endDate = new Date(event.endDate)

        if ((endDate.getTime() - startDate.getTime()) < 0) {
            return res.status(status.BAD_REQUEST).json(new ApiError(status.BAD_REQUEST, AppString.INVALID_DATE))
        }

        let newEvent = await eventService.createEvent(user._id, event);
        if (!newEvent) {
            return res.status(status.INTERNAL_SERVER_ERROR)
                .json(
                    new ApiError(status.INTERNAL_SERVER_ERROR, AppString.EVENT_CREATION_FAILED)
                );
        }
        const eventCreated = await eventService.getFullEventByEventId(newEvent._id.toString())

        return res.status(status.OK)
            .json(
                new ApiResponse(status.OK, eventCreated, AppString.EVENT_CREATED)
            );

    } catch (error) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json(
                new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message)
            );
    }
})

const getOwnEvents = asyncHandler(async (req: Request, res: Response) => {
    try {
        // let { page, } = req.query; it is required that's why we can't use
        let page: number =
            typeof req.query?.page === "string"
            && parseInt(req.query?.page) || 1;
        let limit: number =
            typeof req.query?.limit === "string"
            && parseInt(req.query?.limit) || 10;

        let keyword = typeof req.query?.keyword === "string"
            && req.query?.keyword || "";
        let eventStatus = typeof req.query?.status === "string"
            && req.query?.status || "";

        let eventType = typeof req.query?.type === "string"
            && req.query?.type || "";
        let sortby = typeof req.query?.sortby === "string"
            && req.query?.sortby || "";
        // let eventExist = await eventService.getEventByUserId(req.user._id)
        // if (!eventExist) {
        //     return;
        // }
        // if (new Date(eventExist?.startDate).getTime() >= new Date(Date.now()).getTime()) {
        //     if (eventExist.status !== 'cancelled') {
        //         eventExist.status = 'upcoming'
        //     }

        // } else if (new Date(eventExist?.endDate).getTime() <= new Date(Date.now()).getTime()) {
        //     if (eventExist.status !== 'cancelled') {
        //         eventExist.status = "completed"
        //     }
        // }
        // await eventExist.save();
        let event = await eventService.getOwnEventsByUserId(req.user._id, page, limit, keyword, eventStatus, eventType, sortby);
        return res.status(status.OK)
            .json(
                new ApiResponse(status.OK, event, AppString.EVENT_RETRIEVED)
            );
    } catch (error) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json(
                new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message)
            );
    }
})

const getFullEvent = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { eventId } = req.params;
        let event = await eventService.getFullEventByEventId(eventId);

        if (!event) {
            return res
                .status(status.BAD_REQUEST)
                .json(
                    new ApiError(status.BAD_REQUEST, AppString.EVENT_NOT_EXIST)
                );
        }

        return res.status(status.OK)
            .json(
                new ApiResponse(status.OK, event, AppString.EVENT_RETRIEVED)
            );
    } catch (error) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json(
                new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message)
            );
    }
})

const likeEvent = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { eventId } = req.params;
        const userId = req.user._id
        const event = await eventService.getEventById(eventId);

        if (!event) {
            return res
                .status(status.NOT_FOUND)
                .json(new ApiError(status.NOT_FOUND, AppString.EVENT_NOT_FOUND));
        }

        let likeSavedUser = await userService.likeEventByUser(eventId, userId);
        let likeSavedEvent = await eventService.eventLikedByUser(eventId, userId);

        if (!likeSavedUser || !likeSavedEvent) {
            return res
                .status(status.INTERNAL_SERVER_ERROR)
                .json(new ApiError(status.INTERNAL_SERVER_ERROR, AppString.EVENT_NOT_LIKED));
        }

        return res.status(status.OK)
            .json(
                new ApiResponse(status.OK, {}, AppString.EVENT_LIKED)
            );

    } catch (error) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json(
                new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message)
            );
    }
})

const saveEvent = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { eventId } = req.params;
        const userId = req.user._id
        const event = await eventService.getEventById(eventId);

        if (!event) {
            return res
                .status(status.NOT_FOUND)
                .json(new ApiError(status.NOT_FOUND, AppString.EVENT_NOT_FOUND));
        }

        let savedEventUser = await userService.saveEventByUser(eventId, userId);

        if (!savedEventUser) {
            return res
                .status(status.INTERNAL_SERVER_ERROR)
                .json(new ApiError(status.INTERNAL_SERVER_ERROR, AppString.EVENT_NOT_SAVED));
        }

        return res.status(status.OK)
            .json(
                new ApiResponse(status.OK, {}, AppString.EVENT_SAVED)
            );

    } catch (error) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json(
                new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message)
            );
    }
})

const sendInvitation = asyncHandler(async (req: Request, res: Response) => {
    try {
        const user = req.user
        const { recipientId, eventId } = req.body;
        if (recipientId === user._id) {
            return res
                .status(status.BAD_REQUEST)
                .json(
                    new ApiError(status.BAD_REQUEST, AppString.RECIPIENT_IS_OWNER)
                );
        }
        const recipient = await userService.getUserById(recipientId)

        const event = await eventService.getEventById(eventId)
        if (!recipient || !event) {
            return res
                .status(status.BAD_REQUEST)
                .json(
                    new ApiError(status.BAD_REQUEST, AppString.EVENT_RECIPIENT_NOT)
                );
        }
        const invitation = await invitationService.createInvitation(eventId, user._id, recipientId);

        await notificationService.createNotification({
            type: "invitation",
            message: `${user.name} Invite ${event.title}`,
            sender: user._id,
            recipient: user._id,
            invitationId: invitation._id
        })

        return res
            .status(status.OK)
            .json(
                new ApiResponse(status.OK, {}, AppString.INVITATION_SENT)
            );
    } catch (error) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json(
                new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message)
            );
    }
})

const acceptInvitation = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { invitationId } = req.params;
        const invitation = await invitationService.getInvitationById(invitationId);

        const event = await eventService.getEventById(invitation?.event!);
        const recipient = await userService.getUserById(invitation?.recipient!);

        if (!invitation || !event || !recipient) {
            return res
                .status(status.BAD_REQUEST)
                .json(
                    new ApiError(status.BAD_REQUEST, AppString.INVITAIION_NOT_EXIST)
                );
        }

        await notificationService.createNotification({
            type: "joinEvent",
            message: `${recipient.name} Acceted Your ${event.title!}`,
            sender: recipient._id,
            recipient: invitation?.sender!,
        })

        await invitationService.acceptInvitation(invitationId)
        await userService.addEventToJoinedEvent(recipient._id, event._id);
        await eventService.addUserToParticipants(event._id, recipient._id,);

        return res.status(status.OK).json(new ApiResponse(status.OK, {}, AppString.INVITATION_ACCEPT))

    } catch (error) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json(
                new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message)
            );
    }
})

const rejectInvitation = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { invitationId } = req.params;
        const invitation = await invitationService.getInvitationById(invitationId);

        const event = await eventService.getEventById(invitation?.event!);
        const recipient = await userService.getUserById(invitation?.recipient!);

        if (!invitation || !event || !recipient) {
            return res
                .status(status.BAD_REQUEST)
                .json(
                    new ApiError(status.BAD_REQUEST, AppString.INVITAIION_NOT_EXIST)
                );
        }

        await notificationService.createNotification({
            type: "joinEvent",
            message: `${recipient.name} Rejected Your ${event.title!}`,
            sender: recipient._id,
            recipient: invitation?.sender!
        })

        await invitationService.rejectInvitation(invitationId)

        return res.status(status.OK).json(new ApiResponse(status.OK, {}, AppString.INVITATION_REJECT))

    } catch (error) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json(
                new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message)
            );
    }
})

const cancelEvent = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { eventId } = req.params;
        const event = await eventService.getEventById(eventId);

        if (!event) {
            return res
                .status(status.BAD_REQUEST)
                .json(
                    new ApiError(status.BAD_REQUEST, AppString.EVENT_NOT_EXIST)
                );
        }
        const owner = await userService.getUserById(event.owner);
        if (!owner) {
            return res
                .status(status.BAD_REQUEST)
                .json(
                    new ApiError(status.BAD_REQUEST, AppString.EVENT_OWNER_NOT_EXIST)
                );
        }
        if (owner._id !== req.user._id) {
            return res
                .status(status.UNAUTHORIZED)
                .json(
                    new ApiError(status.UNAUTHORIZED, AppString.USER_NOT_OWNER)
                );
        }

        let eve = await eventService.cancelEvent(eventId)
        return res.status(status.OK).json(new ApiResponse(status.OK, { eve }, AppString.EVENT_CANCEL))
    } catch (error) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json(
                new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message)
            );
    }
})

const getAllEvents = asyncHandler(async (req: Request, res: Response) => {
    try {
        let page: number =
            typeof req.query?.page === "string"
            && parseInt(req.query?.page) || 1;
        let limit: number =
            typeof req.query?.limit === "string"
            && parseInt(req.query?.limit) || 10;

        let keyword = typeof req.query?.keyword === "string"
            && req.query?.keyword || "";

        let eventType = typeof req.query?.type === "string"
            && req.query?.type || "";
        let sortby = typeof req.query?.sortby === "string"
            && req.query?.sortby || "";
        // let eventExist = await eventService.getEventByUserId(req.user._id)
        // if (!eventExist) {
        //     return;
        // }
        // if (new Date(eventExist?.startDate).getTime() >= new Date(Date.now()).getTime()) {
        //     if (eventExist.status !== 'cancelled') {
        //         eventExist.status = 'upcoming'
        //     }

        // } else if (new Date(eventExist?.endDate).getTime() <= new Date(Date.now()).getTime()) {
        //     if (eventExist.status !== 'cancelled') {
        //         eventExist.status = "completed"
        //     }
        // }
        let event = await eventService.getAllEvents(req.user._id, page, limit, keyword, eventType, sortby);

        return res.status(status.OK)
            .json(
                new ApiResponse(status.OK, event, AppString.EVENT_RETRIEVED)
            );
    } catch (error) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json(
                new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message)
            );
    }
})

const getAllInvitation = asyncHandler(async (req: Request, res: Response) => {
    try {
        const user = req.user;
        const invitations = await invitationService.getInvitationBySenderId(user._id);

        if (!invitations) {
            return res
                .status(status.OK)
                .json(
                    new ApiResponse(status.OK, {}, AppString.NO_INVITATION)
                );
        }

        return res.status(status.OK).json(new ApiResponse(status.OK, invitations, AppString.INVITAIIONS))
    } catch (error) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json(
                new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message)
            );
    }
})

const getAllParticipants = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { eventId } = req.params;
        const userId = req.user._id;
        const participants = await eventService.getAllParticipants(userId, eventId);

        if (!participants) {
            return res
                .status(status.OK)
                .json(
                    new ApiResponse(status.OK, {}, AppString.NO_PARTICIPANT)
                );
        }

        return res.status(status.OK).json(new ApiResponse(status.OK, participants, AppString.PARTICIPANTS))
    } catch (error) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json(
                new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message)
            );
    }
})

const getAllSendParticipants = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { eventId } = req.params;
        const recipients = await invitationService.getInvitationRecipientByEventId(eventId);

        if (!recipients) {
            return res
                .status(status.OK)
                .json(
                    new ApiResponse(status.OK, {}, AppString.NO_PARTICIPANT)
                );
        }

        return res.status(status.OK).json(new ApiResponse(status.OK, recipients, AppString.INVITAIIONS))
    } catch (error) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json(
                new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message)
            );
    }
})

export default {
    createEvent,
    getOwnEvents,
    getFullEvent,
    likeEvent,
    saveEvent,
    sendInvitation,
    acceptInvitation,
    rejectInvitation,
    cancelEvent,
    getAllEvents,
    getAllInvitation,
    getAllParticipants,
    getAllSendParticipants
}