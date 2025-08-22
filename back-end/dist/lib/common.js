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
exports.updateUserLeaveData = exports.createUserLeave = void 0;
const dbConnection_1 = require("../config/dbConnection");
const createUserLeave = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const academicYear = new Date().getFullYear();
    const userLeave = yield dbConnection_1.prisma.userLeave.create({
        data: {
            userId: id,
            totalLeave: 12,
            availableLeave: 12,
            usedLeave: 0,
            academicYear: `${academicYear}`,
            totalWorkingDays: 250,
            attendancePercentage: 100
        }
    });
});
exports.createUserLeave = createUserLeave;
const updateUserLeaveData = (attendancePercentage, usedLeave, availableLeave, leaveDay) => __awaiter(void 0, void 0, void 0, function* () {
    const usedLeaveData = usedLeave + leaveDay;
    const availableLeaveData = availableLeave - leaveDay;
    const attendancePercentageData = (availableLeave / 12) * 100;
    // const userLeave = await prisma.userLeave.update({
    // })
});
exports.updateUserLeaveData = updateUserLeaveData;
