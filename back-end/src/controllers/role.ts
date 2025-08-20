import type { Request, Response } from "express";
import { roleSchema } from "../lib/validation";
import { message } from "../lib/responseMessage";
import { prisma } from "../config/dbConnection";
import { roleType } from "../lib/types";

export const createRole = async (req:Request, res:Response) => {
    try {
        const {error} = roleSchema.validate(req.body)
        if(error) throw new Error(message.ERROR.ROLE.NOT_FOUND)

        const { name, priority } = req.body as roleType

        const checkRole = await prisma.role.findFirst({
            where :{
                name
            }
        })

        if(checkRole) throw new Error(message.ERROR.ROLE.ALREADY_EXISTS)

        const role = await prisma.role.create({
            data:{
                name,
                priority
            }
        })

        return res.status(201).json({
            success: true,
            role,
            message: message.ROLE.CREATED
        })

    } catch (error:any) {
        return res.status(500).json({
            message: message.ERROR.SERVER, 
            error: error.message
        })
    }
}

export const getAllRoles = async (req:Request, res: Response) => {
    try {
        const roles = await prisma.role.findMany({})
        if(!roles) throw new Error(message.ERROR.ROLE.NOT_FOUND)
        
        return res.status(200).json({success: true, roles, message: message.ROLE.FETCHED})

    } catch (error:any) {
        return res.status(500).json({
            message: message.ERROR.SERVER, 
            error: error.message
        })
    }
} 