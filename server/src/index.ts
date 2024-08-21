import { app } from "./app";
import dotenv from 'dotenv'
import { connectDB } from "./dbConnection/dbConfig";

dotenv.config();

const port = process.env.PORT!;

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on PORT : ${port}`)
    })
}).catch((error) => console.log(error));
