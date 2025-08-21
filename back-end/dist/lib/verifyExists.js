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
exports.verifyIfRequestIdExists = exports.verifyIfUserExists = void 0;
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
            id: requestToId
        },
        select: {
            id: true,
            roleId: true,
        }
    });
});
exports.verifyIfRequestIdExists = verifyIfRequestIdExists;
