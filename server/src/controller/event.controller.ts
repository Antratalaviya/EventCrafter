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

        return res.status(status.OK)
            .json(
                new ApiResponse(status.OK, {}, AppString.EVENT_CREATED)
            );

    } catch (error) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json(
                new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message)
            );
    }
})

const getEvent = asyncHandler(async (req: Request, res: Response) => {
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

        let event = await eventService.getEventByUserId(req.user._id, page, limit, keyword, eventStatus, eventType, sortby);
        return res.status(status.OK)
            .json(
                new ApiResponse(status.OK, { event }, AppString.EVENT_RETRIEVED)
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
        let likeSavedEvent = await eventService.likedEventByUser(eventId, userId);

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

        let likeSavedUser = await userService.saveEventByUser(eventId, userId);

        if (!likeSavedUser) {
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
        const recipient = await userService.getUserById(recipientId)

        const event = await eventService.getEventById(eventId)
        if (!recipient || !event) {
            return res
                .status(status.BAD_REQUEST)
                .json(
                    new ApiError(status.BAD_REQUEST, AppString.EVENT_RECIPIENT_NOT)
                );
        }
        let invitation = await invitationService.createInvitation(eventId, user._id, recipientId);

        await notificationService.createNotification({
            type: "invitation",
            message: `${user.name} Invite ${event.title}`,
            sender: user._id as string,
            recipient: user._id as string,
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
        //send notif to owner of event 
        //joined event save(User)
        //participants add to event
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
        //send notif to owner of event 
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
    getEvent,
    likeEvent,
    saveEvent,
    sendInvitation
}