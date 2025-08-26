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
exports.sendMail = exports.getPendingRequest = void 0;
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const handlebars_1 = __importDefault(require("handlebars"));
const tansporter_1 = require("../config/tansporter");
const dbConnection_1 = require("../config/dbConnection");
const sendReminderEmail = (name, email) => __awaiter(void 0, void 0, void 0, function* () {
    const emailTemp = yield promises_1.default.readFile(path_1.default.join(__dirname, "../../src/templete/pending.hbs"), "utf8");
    const templete = handlebars_1.default.compile(emailTemp);
    const htmlToSend = templete({
        name: name,
    });
    const mailOption = {
        from: "LMS",
        to: email,
        subject: "Pending Leave Reminder",
        html: htmlToSend
    };
    tansporter_1.transpoter.sendMail(mailOption, (error, info) => {
        if (error)
            return console.log(error);
        if (info)
            return console.log(info, "successfully send.");
    });
});
const getPendingRequest = () => __awaiter(void 0, void 0, void 0, function* () {
    const pendingReq = yield dbConnection_1.prisma.user.findMany({
        where: {
            requestTo: {
                some: {
                    status: "Pending"
                }
            }
        },
        include: {
            leaveRequest: {
                where: {
                    status: "Pending"
                }
            }
        }
    });
    return pendingReq;
});
exports.getPendingRequest = getPendingRequest;
const sendMail = () => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, exports.getPendingRequest)();
    console.log(user);
    user.forEach((element) => __awaiter(void 0, void 0, void 0, function* () {
        yield sendReminderEmail(element.name, element.email);
    }));
});
exports.sendMail = sendMail;
