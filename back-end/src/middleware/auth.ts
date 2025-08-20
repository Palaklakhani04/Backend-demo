import { NextFunction, Request, Response } from "express";
import { message } from "../lib/responseMessage";
import jwt from "jsonwebtoken"
import { tokenUser } from "../lib/types";

export const authenticateUser = async (req: Request, res:Response, next: NextFunction) => { 
    try {    
        const token = req.cookies["accessToken"]
        if(!token) throw new Error(message.ERROR.USER.UNAUTHORIZED)

        const decodedToken = jwt.verify(token, process.env.AUTH_SECRECT as string) as tokenUser  
        (req as any).user = decodedToken
        
        next();

    } catch (error:any) {
        res.status(500).json({
            message:message.ERROR.SERVER, 
            error: error.message
        })
    }
}