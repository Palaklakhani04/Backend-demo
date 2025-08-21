import { Request, Response } from "express";
import { message } from "../lib/responseMessage";
import { prisma } from "../config/dbConnection";
import { leaveRequestSchema } from "../lib/validation";
import { verifyIfRequestIdExists } from "../lib/verifyExists";


export const getStudentDetail = async (req:Request, res:Response) => {
    try {
        const { id } = req.params

        const student = await prisma.user.findFirst({
            where: {
                id: id
            }
        })

        return res.status(200).json({
            success: true,
            student,
            message: message.FETCHED
        })

    } catch (error:any) {
        return res.status(500).json({
            message: message.ERROR.SERVER, 
            error: error.message
        })
    }
}

export const applyLeaveRequest = async (req: Request, res: Response) => {
    try {
        const { error } = leaveRequestSchema.validate(req.body)
        if(error) throw new Error(message.ERROR.INVALIDE_INPUT)

        const { startDate, endDate, leaveType, status, reason, requestToId } = req.body
        const { userId } = (req as any).user

        const isExists = await verifyIfRequestIdExists(requestToId)
        if(!isExists) throw new Error(message.ERROR.USER.INVALIDE_USER)

        

        const leaveRequest = await prisma.leaveRequest.create({
            data: {
                userId: userId,
                startDate, 
                endDate, 
                leaveType, 
                status, 
                reason, 
                requestToId
            }
        })

        
    } catch (error:any) {
        return res.status(500).json({
            message: message.ERROR.SERVER, 
            error: error.message
        })
    }
}



