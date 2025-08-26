import express from "express"
import indexRouter from "./router/index"
import dotenv from 'dotenv'
import cookieParser from "cookie-parser"
import { authenticateUser } from "./middleware/auth"
import cron from "node-cron"
import { sendMail } from "./lib/emailReminder"

dotenv.config()
const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser());
app.use(authenticateUser);



app.use('/api', indexRouter)

cron.schedule('* * * * * *', async() => {
    await sendMail()
  console.log('Cron job running every minute at', new Date().toLocaleTimeString());
});

app.listen(process.env.PORT , () => console.log("server is runing on loacalhost"))

