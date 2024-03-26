import express from "express";
import cors from "cors";
import {get_result} from "./controllers/Multiplier.js";
import { generateRandomHash } from "./controllers/HashGenerator.js";
import authRoutes from "./routes/auth.routes.js";   
import connectToMongoDB from "./db/connectToMongoDB.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import protectRoute  from "./middleware/protectRoute.js";

dotenv.config();

const app = express();
app.use(cors({
    origin: "*",
    credentials: true,
  }));

// const game_hash = generateRandomHash();
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth',authRoutes);

app.get('https://billion-faire.vercel.app/',(req,res)=>{
    const result = get_result(generateRandomHash());
    console.log(result);
    res.json({'maxValue':result});
})




// const result = get_result(game_hash);
// console.log(result);

app.listen(5000,()=>{
    connectToMongoDB();
    console.log("Server is running on port 5000");
})