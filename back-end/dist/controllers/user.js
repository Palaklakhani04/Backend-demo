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
exports.getDepartment = exports.resetPsw = exports.forgetPsw = exports.logout = exports.updateProfileImage = exports.updateUserDetail = exports.userLogin = exports.userRegister = void 0;
const validation_1 = require("../lib/validation");
const responseMessage_1 = require("../lib/responseMessage");
const dbConnection_1 = require("../config/dbConnection");
const bcrypt_1 = __importDefault(require("bcrypt"));
const verifyExists_1 = require("../lib/verifyExists");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const userLeave_1 = require("../lib/userLeave");
const util_1 = require("../lib/util");
const auth_1 = require("../lib/auth");
dotenv_1.default.config();
const userRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log(req.body);
        const { error } = validation_1.signUpSchema.validate(req.body);
        console.log(error);
        if (error)
            throw new Error(responseMessage_1.message.ERROR.USER.INVALIDE_INPUT);
        const { name, email, password, gender, phone, address, grNumber, department, roleId, className, } = req.body;
        const hashPsw = yield bcrypt_1.default.hash(password, 10);
        const user = yield dbConnection_1.prisma.user.create({
            data: {
                name,
                email,
                password: hashPsw,
                gender,
                image: (0, util_1.toDataUri)((_a = req.file) === null || _a === void 0 ? void 0 : _a.path),
                phone,
                address,
                grNumber: grNumber ? grNumber : null,
                department: department ? department : null,
                roleId: Number(roleId),
                class: className ? className : null,
            },
        });
        yield (0, userLeave_1.createUserLeave)(user.id);
        return res.status(201).json({
            success: true,
            user,
            message: responseMessage_1.message.USER.REGISTER,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: responseMessage_1.message.ERROR.SERVER,
            error: error.message,
        });
    }
});
exports.userRegister = userRegister;
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const { error } = validation_1.loginSchema.validate(req.body);
        console.log(error);
        if (error)
            throw new Error(responseMessage_1.message.ERROR.USER.INVALIDE_INPUT);
        const { email, password } = req.body;
        const user = yield (0, verifyExists_1.verifyIfUserExists)(email);
        if (!user)
            throw new Error(responseMessage_1.message.ERROR.USER.NOT_FOUND);
        const isPasswordValide = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValide)
            throw new Error(responseMessage_1.message.ERROR.USER.INCORRECT_PASSWORD);
        const payload = {
            userId: user.id,
            name: user.name,
            email: email,
            roleId: user.roleId,
        };
        const accessToken = jsonwebtoken_1.default.sign(payload, process.env.AUTH_SECRET || "");
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.USER.LOGIN,
            user: payload,
            token: accessToken,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: responseMessage_1.message.ERROR.SERVER,
            error: error.message,
        });
    }
});
exports.userLogin = userLogin;
const updateUserDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = validation_1.updateUserSchema.validate(req.body);
        console.log(error);
        if (error)
            throw new Error(responseMessage_1.message.ERROR.USER.INVALIDE_INPUT);
        const { name, email, gender, phone, address, grNumber, department, roleId, className } = req.body;
        const { userId } = req.user;
        const updateUser = yield dbConnection_1.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                name,
                email,
                gender,
                phone,
                address,
                grNumber,
                department,
                roleId: Number(roleId),
                class: className || " "
            }
        });
        return res.status(201).json({
            success: true,
            updateUser,
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
exports.updateUserDetail = updateUserDetail;
const updateProfileImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { userId } = req.user;
        if (!userId)
            throw new Error(responseMessage_1.message.ERROR.USER.NOT_FOUND);
        const newProfile = yield dbConnection_1.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                image: (0, util_1.toDataUri)((_a = req.file) === null || _a === void 0 ? void 0 : _a.path)
            }
        });
        if (!newProfile)
            throw new Error(responseMessage_1.message.ERROR.NOT_FOUND);
        return res.status(201).json({
            success: true,
            user: newProfile,
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
exports.updateProfileImage = updateProfileImage;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie("accessToken", "", {
        expires: new Date(0),
        httpOnly: true,
        sameSite: "none"
    });
    res.status(200).json({
        success: true,
        message: responseMessage_1.message.USER.LOGOUT
    });
});
exports.logout = logout;
const forgetPsw = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        if (!email)
            throw new Error(responseMessage_1.message.ERROR.NOT_FOUND);
        const user = yield (0, verifyExists_1.verifyIfUserExists)(email);
        if (!user)
            throw new Error(responseMessage_1.message.ERROR.USER.NOT_FOUND);
        const otp = yield (0, auth_1.generateOtp)();
        const tokenHash = yield bcrypt_1.default.hash(otp.toString(), 10);
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min
        yield dbConnection_1.prisma.oTP.create({
            data: {
                userId: user.id,
                tokenHash,
                expiresAt
            }
        });
        yield (0, auth_1.sendOtpEmail)(email, otp);
        return res.status(200).json({
            success: true,
            message: responseMessage_1.message.OTP.SEND
        });
    }
    catch (error) {
        return res.status(500).json({
            message: responseMessage_1.message.ERROR.SERVER,
            error: error.message
        });
    }
});
exports.forgetPsw = forgetPsw;
const resetPsw = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, otp, newPassword } = req.body;
        const user = yield (0, verifyExists_1.verifyIfUserExists)(email);
        if (!user)
            throw new Error(responseMessage_1.message.ERROR.USER.INVALIDE_INPUT);
        const otpEntry = yield dbConnection_1.prisma.oTP.findFirst({
            where: {
                userId: user.id,
                expiresAt: {
                    gt: new Date()
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        if (!otpEntry)
            throw new Error(responseMessage_1.message.ERROR.OTP.INVALIDE_INPUT);
        const match = yield bcrypt_1.default.compare(otp, otpEntry.tokenHash);
        if (!match)
            throw new Error(responseMessage_1.message.ERROR.OTP.INVALIDE_INPUT);
        const hashPsw = yield bcrypt_1.default.hash(newPassword, 10);
        yield dbConnection_1.prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                password: hashPsw
            }
        });
        yield dbConnection_1.prisma.oTP.delete({
            where: {
                id: otpEntry.id
            }
        });
        return res.status(201).json({
            success: true,
            message: responseMessage_1.message.ERROR.PASSWORD.UPDATE
        });
    }
    catch (error) {
        return res.status(500).json({
            message: responseMessage_1.message.ERROR.SERVER,
            error: error.message
        });
    }
});
exports.resetPsw = resetPsw;
const getDepartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const department = yield dbConnection_1.prisma.user.findMany({
            where: {
                roleId: 2
            },
            select: {
                department: true
            }
        });
        console.log(department);
        return res.status(200).json({
            success: true,
            department,
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
exports.getDepartment = getDepartment;
