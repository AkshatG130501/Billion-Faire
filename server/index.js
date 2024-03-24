import express from "express";
import cors from "cors";
import {get_result} from "./controllers/Multiplier.js";
import { generateRandomHash } from "./controllers/HashGenerator.js";

const app = express();
app.use(cors({
    origin: true,
    credentials: true,
  }));

// const game_hash = generateRandomHash();

app.get('/',(req,res)=>{
    const result = get_result(generateRandomHash());
    console.log(result);
    res.json({'maxValue':result});
})


// const result = get_result(game_hash);
// console.log(result);

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})