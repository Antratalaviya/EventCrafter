import mongoose from "mongoose";

export const connectDB = (): void => {
  mongoose
    .connect(process.env.MONGO_URI as string)
    .then((conn) => {
      console.log(
        `MongoDB connected !!! ${conn.connection.host} : ${conn.connection.name}`
      );
    })
    .catch((err) => {
      console.log(`MongoDB connection failed !!! error : ${err}`);
    });
};
