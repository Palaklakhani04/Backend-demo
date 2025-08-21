"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const student_1 = require("../controllers/student");
const router = (0, express_1.Router)();
router.get("/:id", student_1.getStudentDetail);
router.post("/leaverequest", student_1.applyLeaveRequest);
exports.default = router;
