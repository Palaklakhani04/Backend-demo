import { Request, Response } from "express";
import { message } from "../lib/responseMessage";
import { prisma } from "../config/dbConnection";
import { Days, verifyAvailableDays } from "../lib/verifyExists";
import { updateUserLeaveData } from "../lib/common";

export const getLeaveStatus = async (req:Request, res:Response) => {
    try {
        const { userId } = (req as any).user

        const leaveRequests = await prisma.leaveRequest.findMany({
            where:{
                requestToId: userId
            },
            include: {
                user: {
                    select:{
                        id : true,
                        name: true,
                        department: true
                    }
                }
            }
        })

        if(!leaveRequests) throw new Error(message.ERROR.LEAVE.NOT_FOUND)
        
        return res.status(200).json({
            success: true,
            data: leaveRequests,
            message: message.FETCHED
        })

    } catch (error:any) {
        console.log(error)
        return res.status(500).json({
            message: message.ERROR.SERVER, 
            error: error.message
        })
    }
}


export const approveLeaveStatus = async (req:Request, res:Response) => {
    try {
        const { id } = req.params
        const { status } = req.body
        const { userId } = (req as any).user

        const leaveData = await prisma.leaveRequest.findFirst({
            where:{
                id: Number(id),
                status:"Pending"
            },
            include:{
                user: true
            }
        })

        const userData = await prisma.userLeave.findFirst({
            where: {
                userId: leaveData?.userId
            }
        })

        const leaveDay = await Days(leaveData?.startDate as string, leaveData?.endDate as string, leaveData?.userId as string)

        const isLeave = await verifyAvailableDays(leaveData?.startDate as string, leaveData?.endDate as string, leaveData?.userId as string)

        if(!isLeave) throw new Error(message.ERROR.LEAVE.USED)
        
        const isApproved = await prisma.leaveRequest.update({
            where:{
                id: Number(id)
            },
            data: {
                status
            }
        })

        if(!isApproved) return res.status(400).json({
            message:message.ERROR.UPDATED
        })

        const updateUserLeave = await updateUserLeaveData(userData?.attendancePercentage as number, userData?.availableLeave as number, userData?.usedLeave as number ,leaveDay as number)
        

    } catch (error:any) {
        console.log(error)
        return res.status(500).json({
            message: message.ERROR.SERVER, 
            error: error.message
        })
    }
}