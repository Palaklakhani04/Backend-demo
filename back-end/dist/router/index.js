"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("./user"));
const role_1 = __importDefault(require("./role"));
const student_1 = __importDefault(require("./student"));
const auth_1 = require("../middleware/auth");
const admin_1 = __importDefault(require("./admin"));
const hodAndFaculty_1 = __importDefault(require("./hodAndFaculty"));
const router = (0, express_1.Router)();
router.use("/users", user_1.default);
router.use("/role", auth_1.verifyOnlyAdmin, role_1.default);
router.use("/student", auth_1.verifyUserAuthorization, student_1.default);
router.use("/admin", auth_1.verifyOnlyAdmin, admin_1.default);
router.use("/hodandfaculty", auth_1.verifyOnlyfacultyOrHod, hodAndFaculty_1.default);
exports.default = router;
