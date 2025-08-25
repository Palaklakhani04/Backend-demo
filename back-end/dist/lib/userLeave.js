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
const updateUserLeaveData = (availableLeave, usedLeave, leaveDay, id, totalWorkingDays) => __awaiter(void 0, void 0, void 0, function* () {
    const usedLeaveData = usedLeave + leaveDay;
    const availableLeaveData = availableLeave - leaveDay;
    const attendancePercentageData = (((totalWorkingDays - usedLeaveData) / totalWorkingDays) * 100).toFixed(2);
    const userLeave = yield dbConnection_1.prisma.userLeave.update({
        where: {
            id: id
        },
        data: {
            attendancePercentage: attendancePercentageData,
            availableLeave: availableLeaveData,
            usedLeave: usedLeaveData
        }
    });
});
exports.updateUserLeaveData = updateUserLeaveData;
// export const getUserLeaveData = async () => {
//         const student = await prisma.user.findMany({
//            where: {
//              roleId: 4
//            },
//            include: {
//              leaveRequest:true
//            }
//         })
//         const faculty = await prisma.user.findMany({
//             where: {
//                 roleId: 3
//             },
//             include: {
//              leaveRequest:true
//            }
//         })
//         const hod = await prisma.user.findMany({
//             include:{
//                 leaveRequest: {
//                     select: {
//                         userId : true
//                     }
//                 }
//             }
//         })
//         console.log(hod)
//         const leaveDataOfUser = {
//             HodLeaveCount: hod.length ,
//             FacultyLeaveCount: faculty.length,
//             StudentLeaveCount: student.length
//         }
//         return leaveDataOfUser
// }
