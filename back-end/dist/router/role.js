"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const role_1 = require("../controllers/role");
const router = (0, express_1.Router)();
router.post("/", role_1.createRole);
router.get("/", role_1.getAllRoles);
exports.default = router;
