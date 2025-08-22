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
exports.updateProfileImage = exports.updateUserDetail = exports.userLogin = exports.userRegister = void 0;
const validation_1 = require("../lib/validation");
const responseMessage_1 = require("../lib/responseMessage");
const dbConnection_1 = require("../config/dbConnection");
const bcrypt_1 = __importDefault(require("bcrypt"));
const verifyExists_1 = require("../lib/verifyExists");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const common_1 = require("../lib/common");
dotenv_1.default.config();
const userRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { error } = validation_1.signUpSchema.validate(req.body);
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
                image: ((_a = req.file) === null || _a === void 0 ? void 0 : _a.path) || "",
                phone,
                address,
                grNumber: grNumber ? grNumber : null,
                department: department ? department : null,
                roleId: Number(roleId),
                class: className ? className : null,
            },
        });
        yield (0, common_1.createUserLeave)(user.id);
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
            error: error,
        });
    }
});
exports.userRegister = userRegister;
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = validation_1.loginSchema.validate(req.body);
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
                class: className
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
                image: `${(_a = req.file) === null || _a === void 0 ? void 0 : _a.path}`
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
