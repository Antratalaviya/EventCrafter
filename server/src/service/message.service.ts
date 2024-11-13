import mongoose from "mongoose"
import { Message } from "../model/message.model"
import { MsgDocument } from "../constants";

const createMessage = async (userId: string, text: string | null, image: string | null) => {
    return await Message.create({
        sender: new mongoose.Types.ObjectId(userId),
        text: text,
        image: image
    });
}

const getMessage = async (chatId: string) => {
    return await Message.find({
        _id: new mongoose.Types.ObjectId(chatId),
    });
}

const seenMessage = async (messages: MsgDocument[], receiverId: string) => {
    const messageIds = messages?.length ? messages : [];
    return await Message.updateMany(
        {
            _id: {
                $in: messageIds  // Now we directly pass the array of message IDs
            },
            sender: receiverId
        },
        {
            $set: {
                seen: true
            }
        }
    )
}

export default {
    createMessage,
    getMessage,
    seenMessage
}