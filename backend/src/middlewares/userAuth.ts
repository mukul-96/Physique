import  { Request, Response,NextFunction } from 'express';
import jwt, { JwtPayload} from "jsonwebtoken"
import dotenv from 'dotenv';

dotenv.config();
interface AuthRequest extends Request {
    user?: JwtPayload | string
  }
  const secret = process.env.JWT_SECRET as string;

const userAuth = (req:AuthRequest, res:Response, next:NextFunction) => {
    const auth = req.headers.authorization;

    if (!auth || !auth.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Authorization header is missing or invalid"
        });
    }

    const token = auth.split(" ")[1];
    
    try {
        const response = jwt.verify(token,secret);
        if (response) {
            req.user = response;
            next();
        }
    } catch (e) {
        return res.status(401).json({
            message: "Authentication failed: "+e
        });
    }
};

export default userAuth;
