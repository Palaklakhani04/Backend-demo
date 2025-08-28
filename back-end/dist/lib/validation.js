"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaveRequestSchema = exports.updateUserSchema = exports.loginSchema = exports.roleSchema = exports.signUpSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.signUpSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
    gender: joi_1.default.string().required(),
    grNumber: joi_1.default.string().optional(),
    phone: joi_1.default.string().required(),
    address: joi_1.default.string().required(),
    department: joi_1.default.string().optional(),
    class: joi_1.default.string().optional(),
    roleId: joi_1.default.string().required()
});
exports.roleSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    priority: joi_1.default.number().required()
});
exports.loginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required()
});
exports.updateUserSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    gender: joi_1.default.string().required(),
    grNumber: joi_1.default.string().optional(),
    phone: joi_1.default.string().required(),
    address: joi_1.default.string().required(),
    department: joi_1.default.string().optional(),
    class: joi_1.default.string().optional(),
    roleId: joi_1.default.number().required()
});
exports.leaveRequestSchema = joi_1.default.object({
    startDate: joi_1.default.string().required(),
    endDate: joi_1.default.string().required(),
    requestToId: joi_1.default.string().required(),
    reason: joi_1.default.string().required(),
    leaveType: joi_1.default.string().valid('firstHalf', 'secondeHalf', 'fullDay').required(),
    status: joi_1.default.string().default("Pending").valid('Pending', 'Approved', 'Rejected').required()
});
