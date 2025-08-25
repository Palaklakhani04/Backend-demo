import nodemailer, { Transporter } from "nodemailer"
import dotenv from "dotenv"

dotenv.config()

export const transpoter: Transporter = nodemailer.createTransport({
    //@ts-ignore
   host : process.env.ETHEREAL_HOST as string,
   port : process.env.ETHEREAL_PORT,
   auth:{
    user: process.env.ETHEREAL_USER,
    pass: process.env.ETHEREAL_PSW
   }
})

