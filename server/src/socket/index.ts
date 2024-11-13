import { Server as SocketIOServer } from 'socket.io';
import { createServer } from 'http';
import { getUserFromToken } from '../middleware/auth.middleware';
import { app } from '../app';
import chatService from '../service/chat.service';
import messageService from '../service/message.service';

const server = createServer(app);
const io = new SocketIOServer(server, {
    cors: {
        origin: ["http://localhost:3000"],
        credentials: true,
    }
});
const onlineUsers = new Set();

io.on('connection', async (socket) => {
    console.log('user ', socket.id);

    const token = socket.handshake.auth.token;

    const user = await getUserFromToken(token);

    socket.join(user?._id.toString());
    onlineUsers.add(user?._id.toString());

    io.emit("onlineUser", Array.from(onlineUsers))

    socket.on("getConversations", async (userId) => {
        const conversations = await chatService.findUserChat(userId);
        socket.emit("conversations", conversations)
    })

    socket.on("newMessage", async (data) => {
        const conversation = await chatService.conversationExist(data.sender, data.receiver);

        const newMessage = await messageService.createMessage(data.sender, data.text, data.image);

        await chatService.updateConversation(conversation._id, newMessage)
        const getConversation = await chatService.getConversation(data.sender, data.receiver)

        const conversationSender = await chatService.findUserChat(data.sender);
        const conversationReceiver = await chatService.findUserChat(data.receiver);

        io.to(data?.sender).emit("message", getConversation?.messages)
        io.to(data?.receiver).emit("message", getConversation?.messages)

        io.to(data?.sender).emit("conversations", conversationSender)
        io.to(data?.receiver).emit("conversations", conversationReceiver)
    })

    socket.on("getMessage", async (data) => {
        const getConversation = await chatService.getConversation(data.sender, data.receiver)
        socket.emit("message", getConversation?.messages)
    })

    socket.on("seen", async (receiverId) => {
        const conversation = await chatService.getConversation(receiverId, user?._id.toString());

        await messageService.seenMessage(conversation?.messages || [], receiverId);

        const conversationSender = await chatService.findUserChat(user?._id.toString());
        const conversationReceiver = await chatService.findUserChat(receiverId);

        const getConversation = await chatService.getConversation(user?._id.toString(), receiverId)

        io.to(user?._id.toString()).emit("conversations", conversationSender)
        io.to(receiverId).emit("conversations", conversationReceiver)

        io.to(user?._id.toString()).emit("message", getConversation?.messages)
        io.to(receiverId).emit("message", getConversation?.messages)

    })

    socket.on("disconnect", () => {
        onlineUsers.delete(user?._id.toString())
        io.emit("onlineUser", Array.from(onlineUsers))
        console.log("disconnect")
    })
});

export {
    server
}
