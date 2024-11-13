import express, { Response, NextFunction } from "express";
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';

import authRoutes from "./router/auth.router";
import userRoutes from "./router/user.router";
import eventRoutes from "./router/event.router";
import avatarRoutes from "./router/avatar.router";
import paymentRoutes from "./router/payment.router";
import invitationRoutes from "./router/invitation.router";
import connectionRoutes from "./router/connection.router";
import chatRoutes from "./router/chat.router";
import messageRoutes from "./router/message.router";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: "GET, POST,PUT,PATCH, DELETE",
  })
);

app.use((_, res: Response, next: NextFunction) => {
  res.header(
    "Access-Control-Allow-Header",
    "X-Requested-With, Accept, Authorization, Origin, Content-Type"
  );
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST,PUT,PATCH, DELETE");
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", async (_, res: Response) => {
  res.status(200).send({ message: "Api is running" });
});

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/event", eventRoutes);
app.use("/avatar", avatarRoutes);
app.use("/payment", paymentRoutes);
app.use("/invitation", invitationRoutes);
app.use("/connection", connectionRoutes);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);

export { app };
