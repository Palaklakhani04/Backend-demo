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
exports.sendOtpEmail = exports.generateOtp = void 0;
const path_1 = __importDefault(require("path"));
const handlebars_1 = __importDefault(require("handlebars"));
const promises_1 = __importDefault(require("fs/promises"));
const tansporter_1 = require("../config/tansporter");
const responseMessage_1 = require("./responseMessage");
const generateOtp = () => __awaiter(void 0, void 0, void 0, function* () {
    const otp = Math.floor(Math.random() * 900000) + 100000;
    return otp;
});
exports.generateOtp = generateOtp;
const sendOtpEmail = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    const emailTemp = yield promises_1.default.readFile(path_1.default.join(__dirname, "../../src/templete/otp.hbs"), "utf8");
    const templete = handlebars_1.default.compile(emailTemp);
    const htmlToSend = templete({
        otp: otp,
    });
    const mailOptions = {
        from: "LMS",
        to: email,
        subject: 'Your OTP code for Password Reset.',
        html: htmlToSend
    };
    try {
        yield tansporter_1.transpoter.sendMail(mailOptions);
    }
    catch (error) {
        throw new Error(responseMessage_1.message.ERROR.OTP.SEND);
    }
});
exports.sendOtpEmail = sendOtpEmail;
