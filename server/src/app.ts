import express, { Response, NextFunction } from "express";
import cors from "cors";

import authRoutes from "./router/auth.router";
import userRoutes from "./router/user.router";
import eventRoutes from "./router/event.router";
import avatarRoutes from "./router/avatar.router";
import paymentRoutes from "./router/payment.router";
import invitationRoutes from "./router/invitation.router";
import connectionRoutes from "./router/connection.router";

const app = express();

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

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
    methods: "GET, POST,PUT,PATCH, DELETE",
  })
);

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

export { app };
