import { Router } from "express";
import { applyLeaveRequest, getStudentDetail} from "../controllers/student";

const router = Router()

router.get("/:id", getStudentDetail)
router.post("/leaverequest" , applyLeaveRequest)

export default router