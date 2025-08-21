import express from "express"
import indexRouter from "./router/index"
import dotenv from 'dotenv'
import cookieParser from "cookie-parser"
import { authenticateUser } from "./middleware/auth"

dotenv.config()
const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser());
app.use(authenticateUser);

app.use('/api', indexRouter)

app.listen(process.env.PORT , () => console.log("server is runing on loacalhost"))