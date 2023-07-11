import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const authenticated=async (req,res,next)=>{
    const {token} = req.cookies;
    if(token){
        const id=jwt.verify(token,process.env.SECRET_KEY);
        const user=await User.findById(id).select(["-email","-password"]);
        req.user=user;
        next();
    }
    else{
        res.status(400).json({success:false,message:"Login required "});
    }
}