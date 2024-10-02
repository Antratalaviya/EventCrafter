import mongoose, { PipelineStage } from "mongoose"
import { Invitation } from "../model/invitation.model"

const createInvitation = async (eventId: string, senderId: string, recipientId: string) => {
    return await Invitation.create({
        sender: senderId,
        recipient: recipientId,
        event: eventId
    })
}

const getAllInvitation = async (userId: string) => {   //accept/reject ? pending
    const pipeline: PipelineStage[] = [
        {
            $match: {
                recipient: new mongoose.Types.ObjectId(userId),
                pending: { $ne: false }
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: "sender",
                foreignField: "_id",
                as: "sender"
            },
        },
        {
            $unwind: {
                path: "$sender",
                preserveNullAndEmptyArrays: true
            }

        },
        {
            $lookup: {
                from: "events",
                localField: "event",
                foreignField: "_id",
                as: "event"
            }
        },
        {
            $unwind: {
                path: "$event",
                preserveNullAndEmptyArrays: true
            }

        },
        {
            $sort: {
                createdAt: -1
            }
        },
        {
            $project: {
                _id: 1,
                isAccepted: 1,
                event: "$event._id",
                profileImg: "$sender.profileImg",
                avatar: "$sender.avatar",
                name: "$sender.name",
                surname: "$sender.surname",
                title: "$event.title",
                type: "$event.type",
                startDate: "$event.startDate",
                startTime: "$event.startTime",
                endTime: "$event.endTime",
                participants: {
                    $size: {
                        $ifNull: ["$event.participants", []]
                    }
                },
                updatedAt: 1
            }
        }
    ]
    return await Invitation.aggregate(pipeline);
}

const getAllReceivedInvitation = async (userId: string) => {   //received ? accepted and rejected  not pending
    const pipeline: PipelineStage[] = [
        {
            $match: {
                recipient: new mongoose.Types.ObjectId(userId),
                pending: { $ne: true }
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: "sender",
                foreignField: "_id",
                as: "sender"
            },
        },
        {
            $unwind: {
                path: "$sender",
                preserveNullAndEmptyArrays: true
            }

        },
        {
            $lookup: {
                from: "events",
                localField: "event",
                foreignField: "_id",
                as: "event"
            }
        },
        {
            $unwind: {
                path: "$event",
                preserveNullAndEmptyArrays: true
            }

        },
        {
            $sort: {
                createdAt: -1
            }
        },
        {
            $project: {
                _id: 1,
                isAccepted: 1,
                profileImg: "$sender.profileImg",
                name: "$sender.name",
                surname: "$sender.surname",
                title: "$event.title",
                type: "$event.type",
                startDate: "$event.startDate",
                startTime: "$event.startTime",
                endTime: "$event.endTime",
                participants: {
                    $size: {
                        $ifNull: ["$event.participants", []]
                    }
                },
                updatedAt: 1
            }
        }
    ]
    return await Invitation.aggregate(pipeline);
}

const getAllSentInvitation = async (userId: string) => {  //sent invitation
    const pipeline: PipelineStage[] = [
        {
            $match: {
                sender: new mongoose.Types.ObjectId(userId),
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: "recipient",
                foreignField: "_id",
                as: "recipient"
            },
        },
        {
            $unwind: {
                path: "$recipient",
                preserveNullAndEmptyArrays: true
            }

        },
        {
            $lookup: {
                from: "events",
                localField: "event",
                foreignField: "_id",
                as: "event"
            }
        },
        {
            $unwind: {
                path: "$event",
                preserveNullAndEmptyArrays: true
            }

        },
        {
            $sort: {
                createdAt: -1
            }
        },
        {
            $project: {
                _id: 1,
                isAccepted: 1,
                pending: 1,
                profileImg: "$recipient.profileImg",
                avatar: "$recipient.avatar",
                name: "$recipient.name",
                surname: "$recipient.surname",
                title: "$event.title",
                type: "$event.type",
                startDate: "$event.startDate",
                startTime: "$event.startTime",
                endTime: "$event.endTime",
                participants: {
                    $size: {
                        $ifNull: ["$event.participants", []]
                    }
                },
                updatedAt: 1
            }
        }
    ]
    return await Invitation.aggregate(pipeline);
}

const getInvitationById = async (invitationId: string) => {
    return await Invitation.findById(invitationId)
}

const getInvitationBySenderId = async (senderId: string) => {
    return await Invitation.findOne({
        sender: new mongoose.Types.ObjectId(senderId)
    })
}

const getInvitationRecipientByEventId = async (senderId: string, eventId: string) => {
    const pipeline: PipelineStage[] = [
        {
            $match: {
                event: new mongoose.Types.ObjectId(eventId),
                sender: new mongoose.Types.ObjectId(senderId),
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
                        if: { $eq: ["$isAccepted", true] },
                        then: "accepted",
                        else: {
                            $cond: {
                                if: { $eq: ["$pending", false] },
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
            isAccepted: true,
            pending: false
        }
    })
    return;
}

const rejectInvitation = async (invitationId: string) => {
    await Invitation.findByIdAndUpdate(invitationId, {
        $set: {
            isAccepted: false,
            pending: false
        }
    })
    return;
}

const invitationExist = async (eventId: string, senderId: string, recipientId: string) => {
    const pipeline = [
        {
            $match: {
                sender: new mongoose.Types.ObjectId(senderId),
                recipient: new mongoose.Types.ObjectId(recipientId),
                event: new mongoose.Types.ObjectId(eventId)
            }
        }
    ]

    return await Invitation.aggregate(pipeline);
}

const getEventParticipants = async (eventId: string) => {
    const pipeline: PipelineStage[] = [
        {
            $match: {
                event: new mongoose.Types.ObjectId(eventId),
                pending: { $ne: true },
                isAccepted: { $ne: false }
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "recipient",
                foreignField: "_id",
                as: "users"
            }
        },
        {
            $unwind: {
                path: "$users",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $project: {
                _id: "$users._id",
                name: "$users.name",
                surname: "$users.surname",
                avatar: "$users.avatar",
            }
        }
    ]
    return await Invitation.aggregate(pipeline)
}

export default {
    createInvitation,
    getAllInvitation,
    getAllSentInvitation,
    getAllReceivedInvitation,
    getInvitationById,
    getInvitationBySenderId,
    getInvitationRecipientByEventId,
    acceptInvitation,
    rejectInvitation,
    invitationExist,
    getEventParticipants
}