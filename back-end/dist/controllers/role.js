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
exports.getAllRoles = exports.createRole = void 0;
const validation_1 = require("../lib/validation");
const responseMessage_1 = require("../lib/responseMessage");
const dbConnection_1 = require("../config/dbConnection");
const createRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = validation_1.roleSchema.validate(req.body);
        if (error)
            throw new Error(responseMessage_1.message.ERROR.ROLE.NOT_FOUND);
        const { name, priority } = req.body;
        const checkRole = yield dbConnection_1.prisma.role.findFirst({
            where: {
                name
            }
        });
        if (checkRole)
            throw new Error(responseMessage_1.message.ERROR.ROLE.ALREADY_EXISTS);
        const role = yield dbConnection_1.prisma.role.create({
            data: {
                name,
                priority
            }
        });
        return res.status(201).json({
            success: true,
            role,
            message: responseMessage_1.message.ROLE.CREATED
        });
    }
    catch (error) {
        return res.status(500).json({
            message: responseMessage_1.message.ERROR.SERVER,
            error: error.message
        });
    }
});
exports.createRole = createRole;
const getAllRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roles = yield dbConnection_1.prisma.role.findMany({});
        if (!roles)
            throw new Error(responseMessage_1.message.ERROR.ROLE.NOT_FOUND);
        return res.status(200).json({ success: true, roles, message: responseMessage_1.message.ROLE.FETCHED });
    }
    catch (error) {
        return res.status(500).json({
            message: responseMessage_1.message.ERROR.SERVER,
            error: error.message
        });
    }
});
exports.getAllRoles = getAllRoles;
