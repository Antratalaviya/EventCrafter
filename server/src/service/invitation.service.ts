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

export default {
    createInvitation,
    getAllInvitation,
    getAllInvitationSend
}