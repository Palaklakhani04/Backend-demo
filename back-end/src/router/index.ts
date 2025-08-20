import { Router } from "express";
import  userRouter from "./user"
import  roleRouter from "./role"

const router = Router()

router.use("/users", userRouter)
router.use("/role" , roleRouter)

export default router