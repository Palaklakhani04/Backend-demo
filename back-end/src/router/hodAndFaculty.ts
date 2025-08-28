import { Router } from "express";
import { getFacultyLeave, getLeaveStatus, updateLeaveStatus, getFacultyLeaveBalance } from "../controllers/hodAndFaculty";
import { applyLeaveRequest } from "../controllers/student";
import { getAllFacultyDetails, getAllHodDetails } from "../controllers/admin";


const router = Router()

router.get("/leavestatus" , getLeaveStatus)
router.put("/updateleavestatus/:id", updateLeaveStatus)
router.post("/applyLeave", applyLeaveRequest)
router.get("/facultyLeave", getFacultyLeave)
router.get("/leavebalance", getFacultyLeaveBalance)
router.get("/allfaculty", getAllFacultyDetails)
router.get("/allhod", getAllHodDetails)
export default router