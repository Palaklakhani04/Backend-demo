"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transpoter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.transpoter = nodemailer_1.default.createTransport({
    //@ts-ignore
    host: process.env.ETHEREAL_HOST,
    port: process.env.ETHEREAL_PORT,
    auth: {
        user: process.env.ETHEREAL_USER,
        pass: process.env.ETHEREAL_PSW
    }
});
