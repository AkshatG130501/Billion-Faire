import express from 'express';
import {signupUser, loginUser, logoutUser} from '../controllers/auth.controller.js';
import protectRoute from '../middleware/protectRoute.js';
import {get_result} from '../controllers/Multiplier.js';
import {generateRandomHash} from '../controllers/HashGenerator.js';

const router = express.Router();

// router.get('/game',(req,res)=>{
//     const result = get_result(generateRandomHash());
//     console.log(result);
//     res.json({'maxValue':result});
// })

router.post('/signup',signupUser);

router.post('/login',loginUser);

router.post('/logout',logoutUser);

export default router;