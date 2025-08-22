"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const student_1 = require("../controllers/student");
const user_1 = require("../controllers/user");
const upload_1 = require("../lib/upload");
const router = (0, express_1.Router)();
router.get("/", student_1.getStudentDetail);
router.post("/leaverequest", student_1.applyLeaveRequest);
router.get("/leave", student_1.getStudentLeave);
router.get("/leavebalance", student_1.getStudentLeaveBlance);
// update student profile 
router.put("/update/profileimage", upload_1.upload.single("image"), user_1.updateProfileImage);
router.put("/update/profiledetail", user_1.updateUserDetail);
exports.default = router;
