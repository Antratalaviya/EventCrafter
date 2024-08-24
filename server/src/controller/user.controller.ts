import { Request, Response } from "express";
import status from 'http-status'
import { ApiError, ApiResponse, asyncHandler } from "../utils/customUtilities";
import { AppString } from "../utils/appString";
import userService from "../service/user.service";
import notificationService from "../service/notification.service";
import invitationService from "../service/invitation.service";


const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
    try {
        const user = req.user;
        return res.status(status.OK).json(new ApiResponse(status.OK, {
            _id: user._id,
            email: user.email,
            name: user.name,
            surname: user.surname,
            profileImg: user.profileImg
            // subscriber counts
        }, AppString.USER_RETRIEVED));
    } catch (error) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json(
                new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message)
            );
    }
})

const savedEventsByUser = asyncHandler(async (req: Request, res: Response) => {
    try {
        const userId = req.user._id;
        const eventSaved = await userService.getSavedEventByUser(userId);
        let events = eventSaved.map((e) => e.eventSaved)
        return res.status(status.OK).json(new ApiResponse(status.OK, events, AppString.SAVED_EVENTS))
    } catch (error) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json(
                new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message)
            );
    }
})

const likedEventsByUser = asyncHandler(async (req: Request, res: Response) => {
    try {
        const userId = req.user._id;
        const eventLiked = await userService.getLikedEventByUser(userId);
        let events = eventLiked.map((e) => e.eventLiked)
        return res.status(status.OK).json(new ApiResponse(status.OK, events, AppString.LIKED_EVENTS))
    } catch (error) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json(
                new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message)
            );
    }
})

const getAllNotification = asyncHandler(async (req: Request, res: Response) => {
    try {
        const userId = req.user._id;
        const notifications = await notificationService.getAllNotification(userId)
        if (!notifications) {
            return res.status(status.OK).json(new ApiResponse(status.OK, {}, AppString.NO_NOTIF))
        }
        return res.status(status.OK).json(new ApiResponse(status.OK, notifications, AppString.NOTIFICATIONS))
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
        const userId = req.user._id;
        const invitations = await invitationService.getAllInvitation(userId)
        if (!invitations) {
            return res.status(status.OK).json(new ApiResponse(status.OK, {}, AppString.NO_INVITATION))
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

const subscribeUser = asyncHandler(async (req: Request, res: Response) => {
    try {
        const user = req.user;
        const { subscribedToId } = req.params;

        let subscribedToUser = await userService.getUserById(subscribedToId);

        if (!subscribedToUser) {
            return res.status(status.NOT_FOUND).json(new ApiError(status.NOT_FOUND, AppString.USER_NOT_EXIST))
        }

        let updatedUser = await userService.subscribeUser(user._id, subscribedToId);
        if (!updatedUser) {
            return res.status(status.BAD_REQUEST).json(new ApiError(status.BAD_REQUEST, AppString.SUBSCRIBE_FAILED))
        }
        await notificationService.createNotification({
            type: "subscribe",
            message: `${subscribedToUser.name} Started Subscribe You`,
            sender: user._id as string,
            recipient: user._id as string,
        })

        return res.status(status.OK).json(new ApiResponse(status.OK, {}, AppString.SUBSCRIBED))
    } catch (error) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json(
                new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message)
            );
    }
})


export default {
    getUserProfile,
    savedEventsByUser,
    getAllNotification,
    getAllInvitation,
    subscribeUser,
    likedEventsByUser
}