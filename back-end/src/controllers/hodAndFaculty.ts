import { Request, Response } from "express";
import { message } from "../lib/responseMessage";
import { prisma } from "../config/dbConnection";
import { Days, verifyAvailableDays, verifyIfRequestIdExists } from "../lib/verifyExists";
import { updateUserLeaveData } from "../lib/userLeave";
import { leaveRequestSchema } from "../lib/validation";

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
        return res.status(500).json({
            message: message.ERROR.SERVER, 
            error: error.message
        })
    }
}


export const updateLeaveStatus = async (req:Request, res:Response) => {
    try {
        const { id } = req.params
        console.log(id)
        const { status } = req.body
        
        const leaveData = await prisma.leaveRequest.findFirst({
            where:{
                id: Number(id),
                status:"Pending"
            },
            include:{
                user: true
            }
        })
        console.log(leaveData)
        const userData = await prisma.userLeave.findFirst({
            where: {
                userId: leaveData?.user.id
            }
        })

        const leaveDay = await Days(leaveData?.startDate as string, leaveData?.endDate as string)
        console.log(leaveDay);

        const isLeave = await verifyAvailableDays(leaveData?.startDate as string, leaveData?.endDate as string, userData?.userId as string)
        if(!isLeave) throw new Error(message.ERROR.LEAVE.USED)
            console.log(isLeave)
        if(status === "Approved"){
            const isApproved = await prisma.leaveRequest.update({
                where:{
                    id: Number(id)
                },
                data: {
                    status
                }
            })
            
            console.log(isApproved)
            if(isApproved) {
                await updateUserLeaveData( userData?.availableLeave as number, userData?.usedLeave as number ,leaveDay as number, userData?.id as number, userData?.totalWorkingDays as number)
            }else{
                throw new Error(message.ERROR.UPDATED)
            }

        }else if(status === "Rejected") {
            const isRejected = await prisma.leaveRequest.update({
                where:{
                    id: Number(id)
                },
                data: {
                    status
                }
            })

            console.log(isRejected)
            if(!isRejected) throw new Error(message.ERROR.UPDATED)

        }else{
            throw new Error(message.ERROR.UPDATED)
        }
        
        return res.json({
            success: true,
            message: message.LEAVE.UPDATED
        })

    } catch (error:any) {
        console.log(error)
        return res.status(500).json({
            message: message.ERROR.SERVER, 
            error: error.message
        })
    }
}

export const getFacultyLeave = async (req:Request, res:Response) => {
    try {
        const { userId } = (req as any).user

        const facultyLeaves = await prisma.leaveRequest.findMany({
            where:{
                userId: userId
            }
        })

        if(!facultyLeaves) throw new Error(message.ERROR.NOT_FOUND)

        return res.status(200).json({
            success:true,
            data:facultyLeaves,
            message:message.FETCHED
        })
        
    } catch (error:any) {
        return res.status(500).json({
            message: message.ERROR.SERVER, 
            error: error.message
        })
    }
}


export const getFacultyLeaveBalance = async (req:Request, res:Response) => {
    try {
        const { userId } = (req as any).user

        const leaveStatus = await prisma.leaveRequest.findMany({
            where: {
                userId: userId,
            }
            
        })

        const userLeaveData = await prisma.userLeave.findFirst({
            where: {
                userId: userId
            }
        })

        const rejectedLeave = leaveStatus.filter((value) => value.status === "Rejected")

        const leaveBalance = {
            AvailableLeave: userLeaveData?.availableLeave,
            AttendancePercentage: userLeaveData?.attendancePercentage,
            ApprovedLeave: userLeaveData?.usedLeave,
            RejectedLeave: rejectedLeave.length
        }

        return res.status(200).json({
            success:true,
            data:leaveBalance,
            message:message.FETCHED
        })
        
    } catch (error:any) {
        return res.status(500).json({
            message: message.ERROR.SERVER, 
            error: error.message
        })
    }
}

