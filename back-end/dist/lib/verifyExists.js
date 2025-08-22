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
exports.verifyAvailableDays = exports.Days = exports.verifyIfRequestIdExists = exports.verifyIfUserExists = void 0;
const dbConnection_1 = require("../config/dbConnection");
const verifyIfUserExists = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield dbConnection_1.prisma.user.findUnique({
        where: {
            email: email
        }
    });
});
exports.verifyIfUserExists = verifyIfUserExists;
const verifyIfRequestIdExists = (requestToId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield dbConnection_1.prisma.user.findUnique({
        where: {
            id: requestToId,
            roleId: {
                not: 4
            }
        },
        select: {
            id: true,
            roleId: true
        }
    });
});
exports.verifyIfRequestIdExists = verifyIfRequestIdExists;
const Days = (userId, startDate, endDate) => __awaiter(void 0, void 0, void 0, function* () {
    const startTime = new Date(startDate);
    const endTime = new Date(endDate);
    const totalTime = endTime.getTime() - startTime.getTime();
    const totalHoursOfLeave = totalTime / (1000 * 60 * 60);
    const totalDaysOfLeave = totalTime / (1000 * 60 * 60 * 24);
    return totalDaysOfLeave;
});
exports.Days = Days;
const verifyAvailableDays = (userId, startDate, endDate) => __awaiter(void 0, void 0, void 0, function* () {
    const startTime = new Date(startDate);
    const endTime = new Date(endDate);
    const totalTime = endTime.getTime() - startTime.getTime();
    const totalHoursOfLeave = totalTime / (1000 * 60 * 60);
    const totalDaysOfLeave = totalTime / (1000 * 60 * 60 * 24);
    const user = yield dbConnection_1.prisma.userLeave.findFirst({
        where: {
            userId: userId
        }
    });
    const unusedLeave = user === null || user === void 0 ? void 0 : user.availableLeave;
    const isLeave = unusedLeave - totalDaysOfLeave;
    if (isLeave > 0) {
        return true;
    }
    else {
        return false;
    }
});
exports.verifyAvailableDays = verifyAvailableDays;
