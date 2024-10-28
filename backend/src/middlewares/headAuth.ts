import { Request,Response,NextFunction } from "express";
import jwt,{JwtPayload } from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config();
const secret=process.env.JWT_SECRET as string;
 interface AuthRequest extends Request{
    head?:JwtPayload |string
 }

 const headAuth=(req:AuthRequest,res:Response,next:NextFunction)=>
 {
    const auth=req.headers.authorization;
    if(!auth || !auth.startsWith("Bearer "))
    {
        return res.status(401).json({
            message:"something wrong with authorization header"
        })
    }
    const token=auth.split(" ")[1];
    try{
        const response=jwt.verify(token,secret);
        if(response)
        {
             req.head=response;
             next();
        }

    }
    catch (e) {
        return res.status(401).json({
            message: "Authentication failed: "+e
        });
    }
}

export default headAuth;

