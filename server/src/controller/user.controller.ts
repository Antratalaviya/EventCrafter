import { Request, Response } from "express";
import status from 'http-status'
import { ApiError, ApiResponse, asyncHandler } from "../utils/customUtilities";
import { AppString } from "../utils/appString";
import userService from "../service/user.service";
import notificationService from "../service/notification.service";
import invitationService from "../service/invitation.service";
import eventService from "../service/event.service";
// import { redisClient } from "../dbConnection/redisConfig";


const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
    try {
        const user = await userService.getUserProfile(req.user._id)
        const eventsCreated = await eventService.getEventByUserId(req.user._id)
        const newUser = {
            ...user[0],
            events: eventsCreated.length
        }
        // await redisClient.set("user", JSON.stringify(newUser), {
        //     NX: true
        // });

        return res.status(status.OK).json(new ApiResponse(status.OK, newUser, AppString.USER_RETRIEVED));
    } catch (error) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json(
                new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message)
            );
    }
})

const getUserById = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const user = await userService.getUserProfile(userId)
        const eventsCreated = await eventService.getEventByUserId(userId)
        const newUser = {
            ...user[0],
            events: eventsCreated.length
        }
        // await redisClient.set("user", JSON.stringify(newUser), {
        //     NX: true
        // });

        return res.status(status.OK).json(new ApiResponse(status.OK, newUser, AppString.USER_RETRIEVED));
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
        if (req.user.savedEvent.length === 0) {
            return res.status(status.OK).json(new ApiResponse(status.OK, [], AppString.SAVED_EVENTS));
        }
        const userId = req.user._id;
        const eventSaved = await userService.getSavedEventByUser(userId);

        return res.status(status.OK).json(new ApiResponse(status.OK, eventSaved, AppString.SAVED_EVENTS))
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
        if (req.user.likedEvent.length === 0) {
            return res.status(status.OK).json(new ApiResponse(status.OK, [], AppString.LIKED_EVENTS));
        }
        const userId = req.user._id;
        const eventLiked = await userService.getLikedEventByUser(userId);
        return res.status(status.OK).json(new ApiResponse(status.OK, eventLiked, AppString.LIKED_EVENTS))
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
            return res.status(status.OK).json(new ApiResponse(status.OK, [], AppString.NO_NOTIF))
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

const readAllNotification = asyncHandler(async (req: Request, res: Response) => {
    try {
        const userId = req.user._id;
        const notifications = await notificationService.readAllNotification(userId)
        if (!notifications) {
            return res.status(status.OK).json(new ApiResponse(status.OK, [], AppString.ACTION_FAILED))
        }
        return res.status(status.OK).json(new ApiResponse(status.OK, notifications, AppString.NOTIFICATION_UPDATED))
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
            sender: user._id,
            recipient: user._id,
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

const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    try {

        let keyword = typeof req.query?.keyword === "string"
            && req.query?.keyword || "";

        const users = await userService.getAllUsers(keyword)
        return res.status(status.OK).json(new ApiResponse(status.OK, users, AppString.USER_RETRIEVED));
    } catch (error) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json(
                new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message)
            );
    }
})

const updateUserAvatar = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { avatar } = req.body;
        const updatedUser = await userService.updateUser(req.user._id, { avatar });

        if (!updatedUser) {
            return res
                .status(status.INTERNAL_SERVER_ERROR)
                .json(
                    new ApiError(status.INTERNAL_SERVER_ERROR, AppString.ACTION_FAILED)
                );
        }

        return res.status(status.OK)
            .json(
                new ApiResponse(status.OK, {}, AppString.AVATAR_UPDATED)
            );
    } catch (error) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json(
                new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message)
            );
    }
})

const updateUserProfileImage = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { profileImg } = req.body;
        const updatedUser = await userService.updateUser(req.user._id, { profileImg });

        if (!updatedUser) {
            return res
                .status(status.INTERNAL_SERVER_ERROR)
                .json(
                    new ApiError(status.INTERNAL_SERVER_ERROR, AppString.ACTION_FAILED)
                );
        }

        return res.status(status.OK)
            .json(
                new ApiResponse(status.OK, {}, AppString.USER_UPDATED)
            );
    } catch (error) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json(
                new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message)
            );
    }
})

const updateUserEmail = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const updatedUser = await userService.updateUser(req.user._id, { email });

        if (!updatedUser) {
            return res
                .status(status.INTERNAL_SERVER_ERROR)
                .json(
                    new ApiError(status.INTERNAL_SERVER_ERROR, AppString.ACTION_FAILED)
                );
        }

        return res.status(status.OK)
            .json(
                new ApiResponse(status.OK, {}, AppString.EMAIL_UPDATED)
            );
    } catch (error) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json(
                new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message)
            );
    }
})

const updateUserProfile = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { name, surname, postcode, orgName, dob } = req.body;
        const updatedUser = await userService.updateUser(req.user._id, { name, surname, postcode, orgName, dob });

        if (!updatedUser) {
            return res
                .status(status.INTERNAL_SERVER_ERROR)
                .json(
                    new ApiError(status.INTERNAL_SERVER_ERROR, AppString.ACTION_FAILED)
                );
        }

        return res.status(status.OK)
            .json(
                new ApiResponse(status.OK, {}, AppString.USER_UPDATED)
            );
    } catch (error) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json(
                new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message)
            );
    }
})

const deleteUserAccount = asyncHandler(async (req: Request, res: Response) => {
    try {
        const deletedUser = await userService.deleteUser(req.user._id)

        if (!deletedUser) {
            return res
                .status(status.INTERNAL_SERVER_ERROR)
                .json(
                    new ApiError(status.INTERNAL_SERVER_ERROR, AppString.ACTION_FAILED)
                );
        }

        return res.status(status.OK)
            .json(
                new ApiResponse(status.OK, {}, AppString.USER_ACCOUNT_DEL)
            );
    } catch (error) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json(
                new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message)
            );
    }
})

const getAllFriends = asyncHandler(async (req: Request, res: Response) => {
    try {

        if (req.user.friends.length === 0) {
            return res.status(status.OK).json(new ApiResponse(status.OK, [], AppString.USER_RETRIEVED));
        }
        const users = await userService.getAllUsersFriends(req.user._id)

        return res.status(status.OK).json(new ApiResponse(status.OK, users, AppString.USER_RETRIEVED));
    } catch (error) {
        return res
            .status(status.INTERNAL_SERVER_ERROR)
            .json(
                new ApiError(status.INTERNAL_SERVER_ERROR, (error as Error).message)
            );
    }
})

const getEventParticipants = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { eventId } = req.params;

        const users = await invitationService.getEventParticipants(eventId)

        // if (req.user.joinedEvent.length === 0) {
        //     return res.status(status.OK).json(new ApiResponse(status.OK, [], AppString.USER_RETRIEVED));
        // }
        return res.status(status.OK).json(new ApiResponse(status.OK, users, AppString.USER_RETRIEVED));
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
    subscribeUser,
    likedEventsByUser,
    getAllUsers,
    updateUserAvatar,
    updateUserEmail,  //
    updateUserProfile, //
    updateUserProfileImage,//
    readAllNotification,
    deleteUserAccount, //
    getAllFriends,
    getEventParticipants,
    getUserById
}