import { Request, Response } from "express";
import { prisma } from "../config/dbConnection";

export const createUserLeave = async (id: string) => {
    const academicYear = new Date().getFullYear()
    const userLeave = await prisma.userLeave.create({
        data:{
            userId: id,
            totalLeave: 12,
            availableLeave: 12,
            usedLeave: 0,
            academicYear:`${academicYear}`,
            totalWorkingDays: 250,
            attendancePercentage: 100
        }
    })
}

export const updateUserLeaveData = async (availableLeave: number, usedLeave: number,  leaveDay:number, id:number, totalWorkingDays:number ) =>{
    const usedLeaveData = usedLeave + leaveDay
    const availableLeaveData = availableLeave - leaveDay
    const attendancePercentageData = (((totalWorkingDays-usedLeaveData)/totalWorkingDays) * 100).toFixed(2)
    
    const userLeave = await prisma.userLeave.update({
        where:{
            id: id
        },
        data:{
            attendancePercentage: attendancePercentageData,
            availableLeave: availableLeaveData,
            usedLeave: usedLeaveData
        }
    })

}