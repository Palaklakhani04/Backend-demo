import { prisma } from "../config/dbConnection"

export const verifyIfUserExists = async (email: string) => {
    return await prisma.user.findUnique({
        where: {
            email: email
        }
    })
}

export const verifyIfRequestIdExists = async (requestToId:string) => {
    return await prisma.user.findUnique({
        where:{
            id: requestToId
        },
        select:{
            id: true,
            roleId: true,
        }
    })
}