import express, { Response, NextFunction } from "express";
import cors from "cors";

import authRoutes from "./router/auth.router";

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

app.get("/test", (_, res: Response) => {
  res.json("Api is running");
});

app.use("/auth", authRoutes);

export { app };
