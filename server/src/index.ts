import dotenv from 'dotenv'
import { connectDB } from "./dbConnection/dbConfig";
import { server } from './socket';

dotenv.config();

const port = process.env.PORT!;

connectDB().then(() => {
    server.listen(port, () => {
        console.log(`Server is running on PORT : ${port}`)
    })
}).catch((error) => console.log(error));
