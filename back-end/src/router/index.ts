import { Router } from "express";
import  userRouter from "./user"
import  roleRouter from "./role"
import studentRouter from  "./student"
import { verifyOnlyAdmin, verifyOnlyfacultyOrHod, verifyUserAuthorization } from "../middleware/auth";
import adminRouter from "./admin"
import hodAndFacultyRouter from "./hodAndFaculty"

const router = Router()

router.use("/users", userRouter)
router.use("/role" ,verifyOnlyAdmin, roleRouter)
router.use("/student", verifyUserAuthorization, studentRouter)
router.use("/admin", verifyOnlyAdmin, adminRouter)
router.use("/hodandfaculty", verifyOnlyfacultyOrHod, hodAndFacultyRouter)

export default router