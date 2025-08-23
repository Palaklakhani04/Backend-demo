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
exports.getFacultyLeave = exports.updateLeaveStatus = exports.getLeaveStatus = void 0;
const responseMessage_1 = require("../lib/responseMessage");
const dbConnection_1 = require("../config/dbConnection");
const verifyExists_1 = require("../lib/verifyExists");
const userLeave_1 = require("../lib/userLeave");
const getLeaveStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.user;
        const leaveRequests = yield dbConnection_1.prisma.leaveRequest.findMany({
            where: {
                requestToId: userId
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        department: true
                    }
                }
            }
        });
        if (!leaveRequests)
            throw new Error(responseMessage_1.message.ERROR.LEAVE.NOT_FOUND);
        return res.status(200).json({
            success: true,
            data: leaveRequests,
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
exports.getLeaveStatus = getLeaveStatus;
const updateLeaveStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const leaveData = yield dbConnection_1.prisma.leaveRequest.findFirst({
            where: {
                id: Number(id),
                status: "Pending"
            },
            include: {
                user: true
            }
        });
        const userData = yield dbConnection_1.prisma.userLeave.findFirst({
            where: {
                userId: leaveData === null || leaveData === void 0 ? void 0 : leaveData.user.id
            }
        });
        const leaveDay = yield (0, verifyExists_1.Days)(leaveData === null || leaveData === void 0 ? void 0 : leaveData.startDate, leaveData === null || leaveData === void 0 ? void 0 : leaveData.endDate);
        const isLeave = yield (0, verifyExists_1.verifyAvailableDays)(leaveData === null || leaveData === void 0 ? void 0 : leaveData.startDate, leaveData === null || leaveData === void 0 ? void 0 : leaveData.endDate, userData === null || userData === void 0 ? void 0 : userData.userId);
        if (!isLeave)
            throw new Error(responseMessage_1.message.ERROR.LEAVE.USED);
        if (status === "Approved") {
            const isApproved = yield dbConnection_1.prisma.leaveRequest.update({
                where: {
                    id: Number(id)
                },
                data: {
                    status
                }
            });
            console.log(isApproved);
            if (isApproved) {
                yield (0, userLeave_1.updateUserLeaveData)(userData === null || userData === void 0 ? void 0 : userData.availableLeave, userData === null || userData === void 0 ? void 0 : userData.usedLeave, leaveDay, userData === null || userData === void 0 ? void 0 : userData.id, userData === null || userData === void 0 ? void 0 : userData.totalWorkingDays);
            }
            else {
                throw new Error(responseMessage_1.message.ERROR.UPDATED);
            }
        }
        else if (status === "Rejected") {
            const isRejected = yield dbConnection_1.prisma.leaveRequest.update({
                where: {
                    id: Number(id)
                },
                data: {
                    status
                }
            });
            console.log(isRejected);
            if (!isRejected)
                throw new Error(responseMessage_1.message.ERROR.UPDATED);
        }
        else {
            throw new Error(responseMessage_1.message.ERROR.UPDATED);
        }
        return res.json({
            success: true,
            message: responseMessage_1.message.LEAVE.UPDATED
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: responseMessage_1.message.ERROR.SERVER,
            error: error.message
        });
    }
});
exports.updateLeaveStatus = updateLeaveStatus;
const getFacultyLeave = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.user;
        const facultyLeaves = yield dbConnection_1.prisma.leaveRequest.findMany({
            where: {
                userId: userId
            }
        });
        if (!facultyLeaves)
            throw new Error(responseMessage_1.message.ERROR.NOT_FOUND);
        return res.status(200).json({
            success: true,
            data: facultyLeaves,
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
exports.getFacultyLeave = getFacultyLeave;
