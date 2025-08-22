"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hodAndFaculty_1 = require("../controllers/hodAndFaculty");
const router = (0, express_1.Router)();
router.get("/leavestatus", hodAndFaculty_1.getLeaveStatus);
exports.default = router;
