import { prisma } from "../config/dbConnection"

export const verifyIfUserExists = async (email: string) => {
    return await prisma.user.findUnique({
        where: {
            email: email
        }
    })
}