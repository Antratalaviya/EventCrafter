import mongoose, { PipelineStage } from "mongoose"
import { Connection } from "../model/connection.model"


const sendRequest = async (sender: string, recipient: string) => {
    return await Connection.create({
        sender: new mongoose.Types.ObjectId(sender),
        recipient: new mongoose.Types.ObjectId(recipient),
    })
}

const getConnectionReqById = async (connectionId: string) => {
    return await Connection.findById(connectionId);
}

const acceptRequest = async (connectionId: string) => {
    return await Connection.findByIdAndUpdate(connectionId, {
        isAccepted: true,
        pending: false
    }, { new: true })
}

const rejectRequest = async (connectionId: string) => {
    return await Connection.findByIdAndUpdate(connectionId, {
        isAccepted: false,
        pending: false
    }, { new: true })
}

const getAllConnectionRequest = async (userId: string) => {
    const pipeline: PipelineStage[] = [
        {
            $match: { recipient: new mongoose.Types.ObjectId(userId) }
        },
        {
            $lookup: {
                from: "users",
                foreignField: "_id",
                localField: "sender",
                as: "sender"
            }
        },
        {
            $unwind: {
                path: "$sender",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $project: {
                _id: 1,
                avatar: "$sender.avatar",
                name: "$sender.name",
                surname: "$sender.surname",
                updatedAt: "$sender.updatedAt"
            }
        }
    ];

    return await Connection.aggregate(pipeline)
}

const connectionExist = async (senderId: string, recipientId: string) => {
    const pipeline = [
        {
            $match: {
                sender: new mongoose.Types.ObjectId(senderId),
                recipient: new mongoose.Types.ObjectId(recipientId),
            }
        },
        {
            $project: {
                _id: 1,
                isAccepted: 1,
                pending: 1
            }
        }
    ]
    return await Connection.aggregate(pipeline);
}

export default {
    sendRequest,
    getConnectionReqById,
    acceptRequest,
    rejectRequest,
    getAllConnectionRequest,
    connectionExist
}