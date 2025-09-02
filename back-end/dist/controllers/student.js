"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFacultyOfDepartment = exports.getStudentLeaveBlance = exports.getStudentLeave = exports.applyLeaveRequest = exports.getStudentDetail = void 0;
const responseMessage_1 = require("../lib/responseMessage");
const dbConnection_1 = require("../config/dbConnection");
const validation_1 = require("../lib/validation");
const verifyExists_1 = require("../lib/verifyExists");
const getStudentDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.user;
        const student = yield dbConnection_1.prisma.user.findFirst({
            where: {
                id: userId
            },
            omit: {
                password: true
            }
        });
        return res.status(200).json({
            success: true,
            student,
            message: responseMessage_1.message.FETCHED
        });
    }
    catch (error) {
        return res.status(500).json({
            message: responseMessage_1.message.ERROR.SERVER,
            error: error.message
        });
    }
});
exports.getStudentDetail = getStudentDetail;
const applyLeaveRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const { error } = validation_1.leaveRequestSchema.validate(req.body);
        console.log(error);
        if (error)
            throw new Error(responseMessage_1.message.ERROR.INVALIDE_INPUT);
        const { startDate, endDate, leaveType, status, reason, requestToId } = req.body;
        console.log(req.body);
        const { userId } = req.user;
        const isExists = yield (0, verifyExists_1.verifyIfRequestIdExists)(requestToId);
        if (!isExists)
            throw new Error(responseMessage_1.message.ERROR.USER.INVALIDE_USER);
        // verify if user has leave or not for leaveRequest
        const isLeave = yield (0, verifyExists_1.verifyAvailableDays)(startDate, endDate, userId);
        console.log(isLeave);
        if (!isLeave)
            throw new Error(responseMessage_1.message.ERROR.LEAVE.USED);
        const leaveRequest = yield dbConnection_1.prisma.leaveRequest.create({
            data: {
                userId: userId,
                startDate,
                endDate,
                leaveType,
                status,
                reason,
                requestToId
            }
        });
        console.log(leaveRequest);
        if (!leaveRequest)
            throw new Error(responseMessage_1.message.ERROR.LEAVE.CREATED);
        return res.status(201).json({
            success: true,
            data: leaveRequest,
            message: responseMessage_1.message.LEAVE.CREATED
        });
    }
    catch (error) {
        return res.status(500).json({
            message: responseMessage_1.message.ERROR.SERVER,
            error: error.message
        });
    }
});
exports.applyLeaveRequest = applyLeaveRequest;
const getStudentLeave = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.user;
        const studentLeave = yield dbConnection_1.prisma.leaveRequest.findMany({
            where: {
                userId: userId
            },
        });
        if (!studentLeave)
            throw new Error(responseMessage_1.message.ERROR.NOT_FOUND);
        return res.status(201).json({
            success: true,
            data: studentLeave,
            message: responseMessage_1.message.FETCHED
        });
    }
    catch (error) {
        return res.status(500).json({
            message: responseMessage_1.message.ERROR.SERVER,
            error: error.message
        });
    }
});
exports.getStudentLeave = getStudentLeave;
const getStudentLeaveBlance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.user;
        const availableLeaveOfStudent = yield dbConnection_1.prisma.userLeave.findFirst({
            where: {
                userId: userId
            }
        });
        const allLeaveRequests = yield dbConnection_1.prisma.leaveRequest.findMany({
            where: {
                userId: userId
            }
        });
        const approvedLeave = allLeaveRequests.filter((value) => value.status === "Approved");
        const rejectedLeave = allLeaveRequests.filter((value) => value.status === "Rejected");
        const leaveBalance = [
            { AvailableLeave: availableLeaveOfStudent === null || availableLeaveOfStudent === void 0 ? void 0 : availableLeaveOfStudent.availableLeave },
            { AttendeancePercentage: availableLeaveOfStudent === null || availableLeaveOfStudent === void 0 ? void 0 : availableLeaveOfStudent.attendancePercentage },
            { ApprovedLeave: approvedLeave.length },
            { RejectedLeave: rejectedLeave.length }
        ];
        return res.status(200).json({
            success: true,
            data: leaveBalance,
            message: responseMessage_1.message.FETCHED
        });
    }
    catch (error) {
        return res.status(500).json({
            message: responseMessage_1.message.ERROR.SERVER,
            error: error.message
        });
    }
});
exports.getStudentLeaveBlance = getStudentLeaveBlance;
const getFacultyOfDepartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.user;
        const user = yield dbConnection_1.prisma.user.findFirst({
            where: {
                id: userId
            },
            select: {
                department: true
            }
        });
        const faculty = yield dbConnection_1.prisma.user.findMany({
            where: {
                department: user === null || user === void 0 ? void 0 : user.department,
                OR: [
                    {
                        roleId: 2
                    },
                    {
                        roleId: 3
                    }
                ]
            },
            select: {
                id: true,
                name: true
            }
        });
        return res.status(200).json({
            success: true,
            faculty,
            message: responseMessage_1.message.FETCHED
        });
    }
    catch (error) {
        return res.status(500).json({
            message: responseMessage_1.message.ERROR.SERVER,
            error: error.message
        });
    }
});
exports.getFacultyOfDepartment = getFacultyOfDepartment;
