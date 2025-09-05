import { Request, Response } from "express"
import { message } from "../lib/responseMessage"
import { prisma } from "../config/dbConnection"
import { updateUserSchema } from "../lib/validation"
import { userRegisterType } from "../lib/types"

// manage student details
export const getAllStudents = async (req:Request, res:Response) => {
    try {
        const students = await prisma.user.findMany({
            where: {
                roleId: 4
            },
            omit: {
                password: true
            }
        })

        if(!students) throw new Error(message.ERROR.NOT_FOUND)

        return res.status(200).json({
            success: true,
            data: students,
            message: message.FETCHED
        })

    } catch (error:any) {
        return res.status(500).json({
            message: message.ERROR.SERVER, 
            error: error.message
        })
    }
}

export const updateUserDetailById = async (req:Request, res:Response) => {
    try {
        const { error } = updateUserSchema.validate(req.body)
        console.log(error)
        if(error) throw new Error(message.ERROR.USER.INVALIDE_INPUT)

        const {name, email, gender, phone, address , grNumber, department, roleId , className } = req.body 
        
        const { id } = req.params
        console.log(id)
        

        const updateUser = await prisma.user.update({
            where: {
                id: id,
            },
            data: {
                name,
                email,
                gender,
                phone, 
                address , 
                grNumber: grNumber,
                department,
                roleId: Number(roleId), 
                class: className  
            }
        })

        if(!updateUser) throw new Error(message.ERROR.NOT_FOUND)

        return res.status(201).json({
            success: true,
            message: message.USER.UPDATED
        })
    } catch (error:any) {
        return res.status(500).json({
            message: message.ERROR.SERVER, 
            error: error.message
        })
    }
}

export const getUserById = async (req:Request, res:Response) => {
    try {
        const { id } = req.params

        const user = await prisma.user.findFirst({
            where: {
                id: id
            },
            omit: {
                password: true
            }
        })

        if(!user) throw new Error(message.ERROR.NOT_FOUND)

        return res.status(200).json({
            success: true,
            data: user,
            message: message.FETCHED
        })

    } catch (error:any) {
        return res.status(500).json({
            message: message.ERROR.SERVER, 
            error: error.message
        })
    }
}

export const deleteUserById = async (req:Request, res:Response) => {
    try {
        const { id } = req.params

        const user = await prisma.user.delete({
            where: {
                id: id
            },
        })

        if(!user) throw new Error(message.ERROR.NOT_FOUND)

        return res.status(200).json({
            success: true,
            message: message.USER.DELETE
        })

    } catch (error:any) {
        return res.status(500).json({
            message: message.ERROR.SERVER, 
            error: error.message
        })
    }
}

export const getAllFacultyDetails = async (req:Request, res:Response) => {
    try {
        const facultyDetail = await prisma.user.findMany({
            where:{
                roleId: 3
            },
            omit:{
                password:true
            }
        })
        
        if(!facultyDetail) throw new Error(message.ERROR.NOT_FOUND)
        
        return res.status(200).json({
            success: true,
            data: facultyDetail,
            message: message.FETCHED
        })

    } catch (error:any) {
        return res.status(500).json({
            message: message.ERROR.SERVER, 
            error: error.message
        })
    }
}

export const getAllHodDetails = async (req:Request, res:Response) => {
    try {
        const hodDetail = await prisma.user.findMany({
            where:{
                roleId: 2
            },
            omit:{
                password:true
            }
        })
        
        if(!hodDetail) throw new Error(message.ERROR.NOT_FOUND)
        
        return res.status(200).json({
            success: true,
            data: hodDetail,
            message: message.FETCHED
        })

    } catch (error:any) {
        return res.status(500).json({
            message: message.ERROR.SERVER, 
            error: error.message
        })
    }
}

export const getLeaveReport = async (req: Request, res:Response) => {
    try {
        const leaveCount = await prisma.leaveRequest.count({})

        const approvedLeave = await prisma.leaveRequest.count({
            where: {
                status: "Approved"
            }
        }) 

        const pendingLeave = await prisma.leaveRequest.count({
            where: {
                status: "Pending"
            }
        }) 

        const totalUser = await prisma.leaveRequest.findMany({
            distinct: ['userId']
        })


        const leaveReport = {
            AllUser : totalUser.length,
            PendingLeave : pendingLeave,
            ApprovedLeave: approvedLeave,
            TotalLeaveCount: leaveCount
        }

        return res.status(200).json({
            success: true,
            data: leaveReport,
            message: message.FETCHED
        })

    } catch (error:any) {
        return res.status(500).json({
            message: message.ERROR.SERVER, 
            error: error.message
        })
    }
}

export const getLeaveReportData = async (req: Request, res:Response) => {
    try {
        const studentLeaveCount = await prisma.leaveRequest.groupBy({
            by: ['userId'],
            _count:{
                id:true
            },
            where:{
                user:{
                    roleId: 4
                }
            },
            orderBy:{
                _count:{
                    id: "desc"
                }
            },
            
        })
        const studentData = await Promise.all(studentLeaveCount.map(async (user) => {
            const std = await prisma.user.findFirst({
                where: {
                    id: user.userId,
                    roleId: 4
                },
                select:{
                    name: true,
                    department: true
                }
            })
            return {
                userId: user.userId,
                name: std?.name,
                leaveCount: user._count,
                deparment: std?.department
            }
        }))

        const facultyLeaveCount = await prisma.leaveRequest.groupBy({
            by: ['userId'],
            _count:{
                id:true
            },
            where:{
                user:{
                    roleId: 3
                }
            },
            orderBy:{
                _count:{
                    id: "desc"
                }
            },
            
        })
        const facultyData = await Promise.all(facultyLeaveCount.map(async (user) => {
            const faculty = await prisma.user.findFirst({
                where: {
                    id: user.userId,
                    roleId: 3
                },
                select:{
                    name: true,
                    department: true,
                }
            })
            return {
                userId: user.userId,
                name: faculty?.name,
                leaveCount: user._count,
                deparment: faculty?.department,
            }
        }))

        const attendancePercentage = 75
       
        const lessAttendance = await prisma.userLeave.findMany({
            where:{
                attendancePercentage: {
                    lte : attendancePercentage
                }
            },
            select:{
                attendancePercentage: true,
                user: {
                    select:{
                        name: true,
                        department:true
                    }
                }
            }
        })
        
        const pendingLeave = await prisma.leaveRequest.findMany({
            where:{
                status: "Pending"
            },
            select:{
                status: true,
                reason:true,
                user:{
                   select:{
                    name: true,
                    department: true,
                    roleId:true
                   }
                }
            }
        })

        return res.status(200).json({
            success: true,
            data: {
                StudentLeaveData: studentData,
                FacultyLeaveData: facultyData,
                LessAttendance: lessAttendance,
                PendingLeave: pendingLeave
            },
            message: message.FETCHED
        })

    } catch (error:any) {
        return res.status(500).json({
            message: message.ERROR.SERVER, 
            error: error.message
        })
    }
}
