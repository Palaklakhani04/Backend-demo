import type { Request, Response } from "express";
import { signUpSchema } from "../lib/validation.js";
import { message } from "../lib/responseMessage.js";
import { prisma } from "../config/dbConnection.js";
import type { userRegisterType } from "../lib/types.js";

export const userRegister = async (req: Request, res: Response) => {
    try {
        const {error} = signUpSchema.validate(req.body)
        if(error) throw new Error(message.ERROR.USER.INVALIDE_INPUT)

        const {name, email, password, gender, phone, address , grNumber, department, roleId , className } = req.body as userRegisterType

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password, 
                gender,
                image: req.file?.filename || "" ,
                phone, 
                address , 
                grNumber: grNumber && grNumber, 
                department: department && department, 
                roleId , 
                class: className && className
            }

        })
        
    } catch (error) {
        
    }
    

    
}