import mongoose, { PipelineStage } from "mongoose";
import { NotificationIp } from "../constants";
import { Notification } from "../model/notification.model"

const createNotification = async (notification: NotificationIp) => {
    return await Notification.create(notification);
}

const getAllNotification = async (userId: string) => {
    const pipeline: PipelineStage[] = [
        {
            $match: { recipient: new mongoose.Types.ObjectId(userId) }
        },
        {
            $sort: {
                createdAt: -1
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "recipient",
                foreignField: "_id",
                as: "user"
            }
        }, {
            $unwind: {
                path: "$user",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $project: {
                _id: 1,
                avatar: "$user.avatar",
                type: 1,
                message: 1,
                isRead: 1,
                createdAt: 1,
                // invitationId: 1
            }
        }
    ]
    return await Notification.aggregate(pipeline)
}

const readAllNotification = async (userId: string) => {
    return await Notification.updateMany(
        { recipient: new mongoose.Types.ObjectId(userId) },
        { $set: { isRead: true } }
    )
}

export default {
    createNotification,
    getAllNotification,
    readAllNotification,
}