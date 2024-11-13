import mongoose, { PipelineStage } from "mongoose";
import { Chat } from "../model/chat.model"
import { ChatDocument, MsgDocument } from "../constants";


const conversationExist = async (firstId: string, secondId: string) => {
    const memberExist = await Chat.findOne({
        $or: [
            { sender: new mongoose.Types.ObjectId(firstId), receiver: new mongoose.Types.ObjectId(secondId) },
            { sender: new mongoose.Types.ObjectId(secondId), receiver: new mongoose.Types.ObjectId(firstId) }
        ]
    })

    if (memberExist) {
        return memberExist;
    }
    return await Chat.create({
        sender: new mongoose.Types.ObjectId(firstId),
        receiver: new mongoose.Types.ObjectId(secondId)
    })
}

const getConversation = async (firstId: string, secondId: string) => {
    return await Chat.findOne({
        $or: [
            { sender: new mongoose.Types.ObjectId(firstId), receiver: new mongoose.Types.ObjectId(secondId) },
            { sender: new mongoose.Types.ObjectId(secondId), receiver: new mongoose.Types.ObjectId(firstId) }
        ]
    }).populate("messages").sort({ updatedAt: -1 })
}

const updateConversation = async (_id: mongoose.Types.ObjectId, message: MsgDocument) => {
    return await Chat.findByIdAndUpdate(_id, {
        $push: {
            messages: message
        }
    }, { new: true }).populate("messages").sort({ updatedAt: -1 })
}

const findUserChat = async (userId: string): Promise<ConversationWithUnseen[]> => {
    const currConversations = await Chat.find({
        $or: [
            { sender: new mongoose.Types.ObjectId(userId) },
            { receiver: new mongoose.Types.ObjectId(userId) }
        ]
    })
        .sort({ updatedAt: -1 })
        .populate("messages");

    const conversations = currConversations.map((conv: ChatDocument) => {
        const unseen = conv.messages.reduce((prev: number, curr: MsgDocument) => {
            // Count unseen messages from the other user
            if (curr.sender.toString() !== userId) {
                return prev + (curr.seen ? 0 : 1);
            }
            return prev;
        }, 0);

        const lastMessage = conv.messages.length > 0 ? conv.messages[conv.messages.length - 1] : null;

        return {
            ...conv.toObject(),
            unseen,
            lastMessage
        };
    });

    return conversations;
};

// Define the return type if necessary
interface ConversationWithUnseen extends ChatDocument {
    unseen: number;
    lastMessage: MsgDocument | null; // Adjust based on your message structure
}


export default {
    conversationExist,
    findUserChat,
    getConversation,
    updateConversation
}