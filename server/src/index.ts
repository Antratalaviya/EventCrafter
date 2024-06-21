import { app } from "./app";
import dotenv from 'dotenv'
import { connectDB } from "./dbConnection/dbConfig";

dotenv.config();

connectDB();

const port = process.env.PORT as string;

app.listen(port, ()=>{
    console.log(`Server is running on PORT : ${port}`)
})