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

export const updateUserLeaveData = async (attendancePercentage: number, usedLeave: number, availableLeave: number, leaveDay:number) =>{
    const usedLeaveData = usedLeave + leaveDay
    const availableLeaveData = availableLeave - leaveDay
    const attendancePercentageData = (availableLeave/12) * 100

    // const userLeave = await prisma.userLeave.update({
        
    // })
}