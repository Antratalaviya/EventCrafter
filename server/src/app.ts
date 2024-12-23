import express, { Response, NextFunction } from "express";
import cors from "cors";
import postmanToOpenApi from "postman-to-openapi";
import swaggerUi from 'swagger-ui-express';
import yaml from 'yaml'
import fs from 'fs'
import path from 'path'

import authRoutes from "./router/auth.router";
import userRoutes from "./router/user.router";
import eventRoutes from "./router/event.router";
import avatarRoutes from "./router/avatar.router";
import paymentRoutes from "./router/payment.router";
import invitationRoutes from "./router/invitation.router";
import connectionRoutes from "./router/connection.router";
import chatRoutes from "./router/chat.router";
import messageRoutes from "./router/message.router";
import propertyRoutes from "./router/property.router";

const app = express();

app.use(
  cors({
    // origin: ["http://localhost:3000"],
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

// app.get("/generate-swagger-yml", async (_, res: Response) => {
//   const postmanCollection = "./postman/collection.json";
//   const outputFile = "./postman/collection.yaml";
//   try {
//     const result = await postmanToOpenApi(postmanCollection, outputFile, {
//       defaultTag: "General",
//     });
//   } catch (err) {
//     console.log(err);
//   }
// });

const swaggerFile = fs.readFileSync(
  path.join(process.cwd(), "swagger.yaml"), 'utf-8'
)
const swaggerJson = yaml.parse(swaggerFile);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJson))

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/event", eventRoutes);
app.use("/avatar", avatarRoutes);
app.use("/payment", paymentRoutes);
app.use("/invitation", invitationRoutes);
app.use("/connection", connectionRoutes);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);
app.use("/property", propertyRoutes);

export { app };
