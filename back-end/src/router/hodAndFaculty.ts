import { Router } from "express";
import { getLeaveStatus } from "../controllers/hodAndFaculty";


const router = Router()

router.get("/leavestatus" , getLeaveStatus)

export default router