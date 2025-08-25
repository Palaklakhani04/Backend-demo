import { Router } from "express";
import { getAllFacultyDetails, getAllHodDetails, getAllStudents, getUserById, updateUserDetailById, deleteUserById, getLeaveReport, getLeaveReportData } from "../controllers/admin";
import { userRegister } from "../controllers/user";
import { upload } from "../lib/upload";

const router = Router()

// manage student details
router.get("/students", getAllStudents)

// user
router.put("/update/:id", updateUserDetailById)
router.get("/user/:id", getUserById)
router.delete("/delete/:id", deleteUserById)
router.post("/createUser", upload.single("image"), userRegister)

// manage Hod
router.get("/hod", getAllHodDetails)

// manage faculty
router.get("/faculty", getAllFacultyDetails)

// leave
router.get("/leavereport", getLeaveReport)
router.get("/leavereportdata", getLeaveReportData)

export default router
