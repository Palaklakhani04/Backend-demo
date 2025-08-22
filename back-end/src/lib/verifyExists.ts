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
            id: requestToId,
            roleId :{
                not : 4
            }
        },
        select:{
            id: true,
            roleId:true
        }
    })
}

export const Days = async (userId: string, startDate:string, endDate: string) => {
    const startTime = new Date(startDate)
    const endTime = new Date(endDate)

    const totalTime = endTime.getTime() - startTime.getTime()
    const totalHoursOfLeave = totalTime / (1000 * 60 * 60);
    const totalDaysOfLeave = totalTime / (1000 * 60 * 60 * 24)
    return totalDaysOfLeave
    
}

export const verifyAvailableDays = async (userId: string, startDate:string, endDate: string) => {
    const startTime = new Date(startDate)
    const endTime = new Date(endDate)

    const totalTime = endTime.getTime() - startTime.getTime()
    const totalHoursOfLeave = totalTime / (1000 * 60 * 60);
    const totalDaysOfLeave = totalTime / (1000 * 60 * 60 * 24)
   
    const user = await prisma.userLeave.findFirst({
        where: {
            userId: userId
        }
    })
    
    const unusedLeave = user?.availableLeave
    const isLeave = unusedLeave as number - totalDaysOfLeave

    if(isLeave > 0){
        return true
    }else{
        return false
    }

}

