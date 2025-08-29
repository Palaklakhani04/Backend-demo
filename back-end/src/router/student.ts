import { Router } from "express";
import { applyLeaveRequest, getFacultyOfDepartment, getStudentDetail, getStudentLeave, getStudentLeaveBlance} from "../controllers/student";
import { updateProfileImage, updateUserDetail } from "../controllers/user";
import { upload } from "../lib/upload";

const router = Router()

router.get("/", getStudentDetail)
router.post("/leaverequest", applyLeaveRequest)
router.get("/leave", getStudentLeave)
router.get("/leavebalance", getStudentLeaveBlance)
router.get("/getfaculty", getFacultyOfDepartment)

// update student profile 
router.put("/update/profileimage", upload.single("image"), updateProfileImage)
router.put("/update/profiledetail", updateUserDetail)

export default router