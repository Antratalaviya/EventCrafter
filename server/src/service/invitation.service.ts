import mongoose, { PipelineStage } from "mongoose"
import { Invitation } from "../model/invitation.model"

const createInvitation = async (eventId: string, senderId: string, recipientId: string) => {
    return await Invitation.create({
        sender: senderId,
        recipient: recipientId,
        event: eventId
    })
}

const getAllInvitation = async (userId: string) => {
    return await Invitation.findOne({
        recipient: userId
    })
}

const getAllInvitationSend = async (userId: string) => {
    return await Invitation.findOne({
        sender: userId
    })
}

const getInvitationById = async (invitationId: string) => {
    return await Invitation.findById(invitationId)
}

const getInvitationBySenderId = async (senderId: string) => {
    return await Invitation.findOne({
        sender: new mongoose.Types.ObjectId(senderId)
    })
}

const getInvitationRecipientByEventId = async (eventId: string) => {
    const pipeline: PipelineStage[] = [
        {
            $match: {
                event: new mongoose.Types.ObjectId(eventId),
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "recipient",
                foreignField: "_id",
                as: 'recipients'
            }
        }, {
            $unwind: {
                path: "$recipients",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $project: {
                _id: "$recipients._id",
                avatar: "$recipients.avatar",
                name: "$recipients.name",
                surname: "$recipients.surname",
                status: {
                    $cond: {
                        if: { $eq: ["$accepted", true] },
                        then: "accepted",
                        else: {
                            $cond: {
                                if: { $eq: ["$rejected", true] },
                                then: "rejected",
                                else: "pending"
                            }
                        }
                    }
                }
            }
        }
    ]

    return await Invitation.aggregate(pipeline);
}

const acceptInvitation = async (invitationId: string) => {
    await Invitation.findByIdAndUpdate(invitationId, {
        $set: {
            accepted: true,
            pending: false
        }
    })
    return;
}
const rejectInvitation = async (invitationId: string) => {
    await Invitation.findByIdAndUpdate(invitationId, {
        $set: {
            rejected: true,
            pending: false
        }
    })
    return;
}

export default {
    createInvitation,
    getAllInvitation,
    getAllInvitationSend,
    getInvitationById,
    getInvitationBySenderId,
    getInvitationRecipientByEventId,
    acceptInvitation,
    rejectInvitation
}