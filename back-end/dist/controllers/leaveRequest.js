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
exports.applyForLeave = void 0;
const validation_1 = require("../lib/validation");
const responseMessage_1 = require("../lib/responseMessage");
const applyForLeave = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = validation_1.leaveRequestSchema.validate(req.body);
        if (error)
            throw new Error(responseMessage_1.message.ERROR.INVALIDE_INPUT);
        const { id } = req.user;
        const { userId, };
        const leaveRequest = yield prisma.leaveRequest.create({
            data: {}
        });
    }
    catch (error) {
    }
});
exports.applyForLeave = applyForLeave;
