import path from "path"
import fs from "fs/promises"
import Handlebars from "handlebars"
import { transpoter } from "../config/tansporter"
import { prisma } from "../config/dbConnection"

const sendReminderEmail = async (name: string, email:string) => {
    const emailTemp = await fs.readFile(
        path.join(__dirname, "../../src/templete/pending.hbs"),
        "utf8"
    )

    const templete = Handlebars.compile(emailTemp)

    const htmlToSend = templete({
        name: name,
    })

    const mailOption = {
        from: "LMS" ,
        to: email,
        subject: "Pending Leave Reminder",
        html: htmlToSend
    }

    transpoter.sendMail(mailOption, (error, info) => {
        if(error) return console.log(error)
        if(info) return console.log(info, "successfully send.")
    })
}

export const getPendingRequest = async () => {
    const pendingReq = await prisma.user.findMany({
      where:{
        requestTo:{
            some:{
                status: "Pending"
            }
        }
      },
      include:{
        leaveRequest:{
            where:{
                status: "Pending"
            }
        }
      }
    })
    
    return pendingReq
}

export const sendMail = async () => {
    const user = await getPendingRequest();

    console.log(user)

    user.forEach(async (element) => {
        await sendReminderEmail(element.name, element.email)
    });
}