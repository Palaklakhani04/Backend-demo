import { Request, Response } from "express";
import { message } from "../lib/responseMessage";
import { prisma } from "../config/dbConnection";
import { leaveRequestSchema } from "../lib/validation";
import { verifyAvailableDays, verifyIfRequestIdExists } from "../lib/verifyExists";


export const getStudentDetail = async (req:Request, res:Response) => {
    try {
        const { userId } = (req as any).user

        const student = await prisma.user.findFirst({
            where: {
                id: userId
            },
            omit:{
                password: true
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

        const isLeave = await verifyAvailableDays( userId ,startDate, endDate)
        if(!isLeave) throw new Error(message.ERROR.LEAVE.USED)

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
    
        if(!leaveRequest) throw new Error(message.ERROR.LEAVE.CREATED)
        
        return res.status(201).json({
            success: true,
            data: leaveRequest,
            message: message.LEAVE.CREATED 
        })
        
    } catch (error:any) {
        return res.status(500).json({
            message: message.ERROR.SERVER, 
            error: error.message
        })
    }
}

export const getStudentLeave = async (req:Request, res:Response) => {
    try {
        const { userId } = (req as any).user

        const studentLeave = await prisma.leaveRequest.findMany({
            where:{
                userId: userId
            },
        })
        if(!studentLeave) throw new Error(message.ERROR.NOT_FOUND)

        return res.status(201).json({
            success: true,
            data: studentLeave,
            message: message.FETCHED
        })
        
    } catch (error: any) {
        return res.status(500).json({
            message: message.ERROR.SERVER, 
            error: error.message
        })
    }
}

export const getStudentLeaveBlance = async (req:Request, res:Response) => {
    try {
        const { userId } = (req as any).user

        const availableLeaveOfStudent = await prisma.userLeave.findFirst({
            where:{
                userId: userId
            }
        })

        const allLeaveRequests = await prisma.leaveRequest.findMany({
            where: {
                userId: userId
            }
        }) 

        const approvedLeave = allLeaveRequests.filter((value) => value.status === "Approved")
        const rejectedLeave = allLeaveRequests.filter((value) => value.status === "Rejected")

        const leaveBalance = {
            AvailableLeave: availableLeaveOfStudent?.availableLeave,
            AttendeancePercentage: availableLeaveOfStudent?.attendancePercentage,
            ApprovedLeave: approvedLeave.length,
            RejectedLeave: rejectedLeave.length
        }

        return res.status(200).json({
            success:true,
            data: leaveBalance,
            message: message.FETCHED
        })

    } catch (error:any) {
        return res.status(500).json({
            message: message.ERROR.SERVER, 
            error: error.message
        })
    }
}