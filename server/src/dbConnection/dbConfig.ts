import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  await mongoose
    .connect(process.env.MONGO_URI!)
    .then((conn) => {
      console.log(
        `MongoDB connected !!! ${conn.connection.host} : ${conn.connection.name}`
      );
    })
    .catch((err) => {
      console.log(`MongoDB connection failed !!! error : ${err}`);
    });
};
