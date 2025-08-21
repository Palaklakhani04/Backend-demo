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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniqueUserRegister = exports.verifyOnlyAdmin = exports.verifyUserAuthorization = exports.authenticateUser = void 0;
const responseMessage_1 = require("../lib/responseMessage");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const verifyExists_1 = require("../lib/verifyExists");
dotenv_1.default.config();
const authenticateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies["accessToken"];
    if (!token)
        return res.json({ message: responseMessage_1.message.ERROR.USER.UNAUTHORIZED });
    const decodedToken = jsonwebtoken_1.default.verify(token, process.env.AUTH_SECRET);
    req.user = decodedToken;
    next();
});
exports.authenticateUser = authenticateUser;
const verifyUserAuthorization = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user) {
        return next();
    }
    else {
        return res.json({
            success: false,
            message: responseMessage_1.message.ERROR.USER.UNAUTHORIZED
        });
    }
});
exports.verifyUserAuthorization = verifyUserAuthorization;
const verifyOnlyAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { roleId } = req.user;
        if (Number(roleId) === 1) {
            return next();
        }
        else {
            return res.json({
                success: false,
                message: responseMessage_1.message.ERROR.USER.UNAUTHORIZED
            });
        }
    }
    catch (error) {
        return res.json({
            success: false,
            message: responseMessage_1.message.ERROR.SERVER
        });
    }
});
exports.verifyOnlyAdmin = verifyOnlyAdmin;
const UniqueUserRegister = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { roleId, email } = req.body;
        const user = yield (0, verifyExists_1.verifyIfUserExists)(email);
        if (user)
            throw new Error(responseMessage_1.message.ERROR.USER.ALREADY_EXISTS);
        if (Number(roleId) === 4) {
            return next();
        }
        else {
            throw new Error(responseMessage_1.message.ERROR.USER.UNAUTHORIZED);
        }
    }
    catch (error) {
        return res.json({
            success: false,
            message: responseMessage_1.message.ERROR.SERVER,
            error: error.message
        });
    }
});
exports.UniqueUserRegister = UniqueUserRegister;
