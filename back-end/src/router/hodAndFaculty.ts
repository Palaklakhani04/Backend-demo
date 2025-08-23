import { Router } from "express";
import { getFacultyLeave, getLeaveStatus, updateLeaveStatus } from "../controllers/hodAndFaculty";
import { applyLeaveRequest } from "../controllers/student";


const router = Router()

router.get("/leavestatus" , getLeaveStatus)
router.put("/updateleavestatus/:id", updateLeaveStatus)
router.post("/applyLeave", applyLeaveRequest)
router.get("/facultyLeave", getFacultyLeave)
export default router