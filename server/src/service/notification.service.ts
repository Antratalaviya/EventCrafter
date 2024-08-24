import { NotificationIp } from "../constants";
import { Notification } from "../model/notification.model"

const createNotification = async (notification: NotificationIp) => {
    return await Notification.create(notification);
}

const getAllNotification = async (userId: string) => {
    return await Notification.findOne({
        recipient: userId
    })
}

export default {
    createNotification,
    getAllNotification
}