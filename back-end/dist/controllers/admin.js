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
exports.getLeaveReportData = exports.getLeaveReport = exports.getAllHodDetails = exports.getAllFacultyDetails = exports.deleteUserById = exports.getUserById = exports.updateUserDetailById = exports.getAllStudents = void 0;
const responseMessage_1 = require("../lib/responseMessage");
const dbConnection_1 = require("../config/dbConnection");
const validation_1 = require("../lib/validation");
// manage student details
const getAllStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield dbConnection_1.prisma.user.findMany({
            where: {
                roleId: 4
            },
            omit: {
                password: true
            }
        });
        if (!students)
            throw new Error(responseMessage_1.message.ERROR.NOT_FOUND);
        return res.status(200).json({
            success: true,
            data: students,
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
exports.getAllStudents = getAllStudents;
const updateUserDetailById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = validation_1.updateUserSchema.validate(req.body);
        console.log(error);
        if (error)
            throw new Error(responseMessage_1.message.ERROR.USER.INVALIDE_INPUT);
        const { name, email, gender, phone, address, grNumber, department, roleId, className } = req.body;
        const { id } = req.params;
        console.log(id);
        const updateUser = yield dbConnection_1.prisma.user.update({
            where: {
                id: id,
            },
            data: {
                name,
                email,
                gender,
                phone,
                address,
                grNumber: grNumber,
                department,
                roleId: Number(roleId),
                class: className
            }
        });
        if (!updateUser)
            throw new Error(responseMessage_1.message.ERROR.NOT_FOUND);
        return res.status(201).json({
            success: true,
            message: responseMessage_1.message.USER.UPDATED
        });
    }
    catch (error) {
        return res.status(500).json({
            message: responseMessage_1.message.ERROR.SERVER,
            error: error.message
        });
    }
});
exports.updateUserDetailById = updateUserDetailById;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield dbConnection_1.prisma.user.findFirst({
            where: {
                id: id
            },
            omit: {
                password: true
            }
        });
        if (!user)
            throw new Error(responseMessage_1.message.ERROR.NOT_FOUND);
        return res.status(200).json({
            success: true,
            data: user,
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
exports.getUserById = getUserById;
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield dbConnection_1.prisma.user.delete({
            where: {
                id: id
            },
        });
        if (!user)
            throw new Error(responseMessage_1.message.ERROR.NOT_FOUND);
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.USER.DELETE
        });
    }
    catch (error) {
        return res.status(500).json({
            message: responseMessage_1.message.ERROR.SERVER,
            error: error.message
        });
    }
});
exports.deleteUserById = deleteUserById;
const getAllFacultyDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const facultyDetail = yield dbConnection_1.prisma.user.findMany({
            where: {
                roleId: 3
            },
            omit: {
                password: true
            }
        });
        if (!facultyDetail)
            throw new Error(responseMessage_1.message.ERROR.NOT_FOUND);
        return res.status(200).json({
            success: true,
            data: facultyDetail,
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
exports.getAllFacultyDetails = getAllFacultyDetails;
const getAllHodDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hodDetail = yield dbConnection_1.prisma.user.findMany({
            where: {
                roleId: 2
            },
            omit: {
                password: true
            }
        });
        if (!hodDetail)
            throw new Error(responseMessage_1.message.ERROR.NOT_FOUND);
        return res.status(200).json({
            success: true,
            data: hodDetail,
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
exports.getAllHodDetails = getAllHodDetails;
const getLeaveReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const leaveCount = yield dbConnection_1.prisma.leaveRequest.count({});
        const approvedLeave = yield dbConnection_1.prisma.leaveRequest.count({
            where: {
                status: "Approved"
            }
        });
        const pendingLeave = yield dbConnection_1.prisma.leaveRequest.count({
            where: {
                status: "Pending"
            }
        });
        const totalUser = yield dbConnection_1.prisma.leaveRequest.findMany({
            distinct: ['userId']
        });
        const leaveReport = {
            AllUser: totalUser.length,
            PendingLeave: pendingLeave,
            ApprovedLeave: approvedLeave,
            TotalLeaveCount: leaveCount
        };
        return res.status(200).json({
            success: true,
            data: leaveReport,
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
exports.getLeaveReport = getLeaveReport;
const getLeaveReportData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentLeaveCount = yield dbConnection_1.prisma.leaveRequest.groupBy({
            by: ['userId'],
            _count: {
                id: true
            },
            where: {
                user: {
                    roleId: 4
                }
            },
            orderBy: {
                _count: {
                    id: "desc"
                }
            },
        });
        const studentData = yield Promise.all(studentLeaveCount.map((user) => __awaiter(void 0, void 0, void 0, function* () {
            const std = yield dbConnection_1.prisma.user.findFirst({
                where: {
                    id: user.userId,
                    roleId: 4
                },
                select: {
                    name: true,
                    department: true
                }
            });
            return {
                userId: user.userId,
                name: std === null || std === void 0 ? void 0 : std.name,
                leaveCount: user._count,
                deparment: std === null || std === void 0 ? void 0 : std.department
            };
        })));
        const facultyLeaveCount = yield dbConnection_1.prisma.leaveRequest.groupBy({
            by: ['userId'],
            _count: {
                id: true
            },
            where: {
                user: {
                    roleId: 3
                }
            },
            orderBy: {
                _count: {
                    id: "desc"
                }
            },
        });
        const facultyData = yield Promise.all(facultyLeaveCount.map((user) => __awaiter(void 0, void 0, void 0, function* () {
            const faculty = yield dbConnection_1.prisma.user.findFirst({
                where: {
                    id: user.userId,
                    roleId: 3
                },
                select: {
                    name: true,
                    department: true,
                }
            });
            return {
                userId: user.userId,
                name: faculty === null || faculty === void 0 ? void 0 : faculty.name,
                leaveCount: user._count,
                deparment: faculty === null || faculty === void 0 ? void 0 : faculty.department,
            };
        })));
        const attendancePercentage = 75;
        const lessAttendance = yield dbConnection_1.prisma.userLeave.findMany({
            where: {
                attendancePercentage: {
                    lte: attendancePercentage
                }
            },
            select: {
                attendancePercentage: true,
                user: {
                    select: {
                        name: true,
                        department: true
                    }
                }
            }
        });
        const pendingLeave = yield dbConnection_1.prisma.leaveRequest.findMany({
            where: {
                status: "Pending"
            },
            select: {
                status: true,
                reason: true,
                user: {
                    select: {
                        name: true,
                        department: true,
                        roleId: true
                    }
                }
            }
        });
        return res.status(200).json({
            success: true,
            data: {
                StudentLeaveData: studentData,
                FacultyLeaveData: facultyData,
                LessAttendance: lessAttendance,
                PendingLeave: pendingLeave
            },
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
exports.getLeaveReportData = getLeaveReportData;
