"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_1 = require("../controllers/admin");
const user_1 = require("../controllers/user");
const upload_1 = require("../lib/upload");
const router = (0, express_1.Router)();
// manage student details
router.get("/students", admin_1.getAllStudents);
// user
router.put("/update/:id", admin_1.updateUserDetailById);
router.get("/user/:id", admin_1.getUserById);
router.delete("/delete/:id", admin_1.deleteUserById);
router.post("/createUser", upload_1.upload.single("image"), user_1.userRegister);
// manage Hod
router.get("/hod", admin_1.getAllHodDetails);
// manage faculty
router.get("/faculty", admin_1.getAllFacultyDetails);
exports.default = router;
