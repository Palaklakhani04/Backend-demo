import { NextFunction, Request, Response } from "express";
import { message } from "../lib/responseMessage";
import jwt from "jsonwebtoken"
import { tokenUser } from "../lib/types";
import dotenv from "dotenv"
import { verifyIfUserExists } from "../lib/verifyExists";

dotenv.config()

export const authenticateUser = async (req: Request, res:Response, next: NextFunction) => { 

    const token = req.cookies["accessToken"]
    if(!token) return res.json({message:message.ERROR.USER.UNAUTHORIZED})

    const decodedToken = jwt.verify(token, process.env.AUTH_SECRET as string) as tokenUser  
    (req as any).user = decodedToken
    next();

}

export const verifyUserAuthorization = async (req:Request, res:Response, next: NextFunction) => {
    
    const user= (req as any).user
    
    if(user){
        return next()
    }else{
        return res.json({
            success: false,
            message: message.ERROR.USER.UNAUTHORIZED
        })
    }
}

export const verifyOnlyAdmin = async (req:Request, res:Response, next: NextFunction) => {
    try {
        const { roleId } = (req as any).user

        if(Number(roleId) === 1){
            return next()
        }else{
            return res.json({
                success: false,
                message: message.ERROR.USER.UNAUTHORIZED
            })
        }
         
    } catch (error) {
        return res.json({
            success: false,
            message: message.ERROR.SERVER
        })
    }
}

export const UniqueUserRegister = async (req:Request, res:Response, next: NextFunction) => {
    try {
        const { roleId , email } = req.body
        
        const user = await verifyIfUserExists(email)
        if(user) throw new Error(message.ERROR.USER.ALREADY_EXISTS)

        if(Number(roleId) === 4){
            return next()
        }else {
            throw new Error(message.ERROR.USER.UNAUTHORIZED)
        }
        
    } catch (error:any) {
        return res.json({
            success: false,
            message: message.ERROR.SERVER,
            error:error.message
        })
    }
}