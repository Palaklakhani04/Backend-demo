import bcrypt from "bcrypt"
import path from "path"
import Handlebars from "handlebars"
import fs from "fs/promises"
import { transpoter } from "../config/tansporter"
import { message } from "./responseMessage"

export const generateOtp = async() => {
    const otp = Math.floor(Math.random() * 900000)+100000
    return otp
}

export const sendOtpEmail = async (email: string, otp: number) => {

    const emailTemp = await fs.readFile(
            path.join(__dirname, "../../src/templete/otp.hbs"),
            "utf8"
        )
    
        const templete = Handlebars.compile(emailTemp)
    
        const htmlToSend = templete({
           otp: otp,
        })
    

    const mailOptions = {
        from: "LMS",
        to: email,
        subject: 'Your OTP code for Password Reset.',
        html: htmlToSend
    }

    try {
        await transpoter.sendMail(mailOptions)
        console.log("otp send")
    } catch (error:any) {
        console.log("fail to send otp" ,error)
        throw new Error(message.ERROR.OTP.SEND)
    }
}