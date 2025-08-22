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
        if(error) throw new Error(message.ERROR.USER.INVALIDE_INPUT)

        const {name, email, gender, phone, address , grNumber, department, roleId , className } = req.body 
        const { id } = req.params

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


