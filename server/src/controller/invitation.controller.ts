import { Request, Response } from "express";
import { ApiError, ApiResponse, asyncHandler } from "../utils/customUtilities";
import invitationService from "../service/invitation.service";
import { AppString } from "../utils/appString";
import status from 'http-status'
import userService from "../service/user.service";
import eventService from "../service/event.service";
import notificationService from "../service/notification.service";

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
const getAllSentInvitation = asyncHandler(async (req: Request, res: Response) => {
    try {
        const userId = req.user._id;
        const invitations = await invitationService.getAllSentInvitation(userId)
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
const getAllReceivedInvitation = asyncHandler(async (req: Request, res: Response) => {
    try {
        const userId = req.user._id;
        const invitations = await invitationService.getAllReceivedInvitation(userId)
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

const getAllSentInvitationOfEvent = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { eventId } = req.params;
        const recipients = await invitationService.getInvitationRecipientByEventId(req.user._id, eventId);

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

const sendInvitation = asyncHandler(async (req: Request, res: Response) => {
    try {
        const user = req.user
        const { recipientId, eventId } = req.body;

        if (recipientId === user._id.toString()) {
            return res
                .status(status.BAD_REQUEST)
                .json(
                    new ApiError(status.BAD_REQUEST, AppString.RECIPIENT_IS_OWNER)
                );
        }
        const invitationExist = await invitationService.invitationExist(eventId, user._id, recipientId);

        if (invitationExist.length > 0) {
            return res
                .status(status.BAD_REQUEST)
                .json(
                    new ApiError(status.BAD_REQUEST, AppString.INVITATION_ALREADY_SENT)
                );
        }
        const recipient = await userService.getUserById(recipientId)

        const event = await eventService.getEventById(eventId)
        if (!recipient || !event) {
            return res
                .status(status.BAD_REQUEST)
                .json(
                    new ApiError(status.BAD_REQUEST, AppString.ACTION_FAILED)
                );
        }
        const invitation = await invitationService.createInvitation(eventId, user._id, recipientId);

        await notificationService.createNotification({
            type: "invitation",
            message: `${user.name} ${user.surname} Invited You To Event ${event.title}`,
            sender: user._id,
            recipient: recipientId,
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
            message: `${recipient.name} ${recipient.surname} Join Your Event ${event.title!}`,
            sender: recipient._id,
            recipient: invitation?.sender!,
        })

        await invitationService.acceptInvitation(invitationId)
        await userService.addEventToJoinedEvent(recipient._id, event._id);
        await eventService.addUserToParticipants(event._id, recipient._id);

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
            message: `${recipient.name} ${recipient.surname} Rejected Your Invitation At Event ${event.title!}`,
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

export default {
    getAllInvitation,
    getAllSentInvitation,
    getAllReceivedInvitation,
    getAllSentInvitationOfEvent,
    sendInvitation,
    acceptInvitation,
    rejectInvitation
}