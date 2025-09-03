"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.message = void 0;
exports.message = {
    USER: {
        REGISTER: "Successfully Register.",
        LOGIN: "Successfully Login.",
        UPDATED: "User Successfully Updated.",
        DELETE: "User Successfully Deleted.",
        LOGOUT: "Successfully Logout.",
    },
    OTP: {
        SEND: " OTP Send successfully",
    },
    FETCHED: "Data Retrived Successfully.",
    ROLE: {
        CREATED: "Role Created.",
        FETCHED: "Role Retrived Successfully.",
    },
    LEAVE: {
        CREATED: "Leave Request Successfully Created.",
        UPDATED: "Leave Status Updated Successfully.",
    },
    ERROR: {
        USER: {
            NOT_FOUND: "User Not Found.",
            ALREADY_EXISTS: "User Already Exists.",
            INVALIDE_INPUT: "Invalide Input",
            INCORRECT_PASSWORD: "Incorrect Password.",
            UNAUTHORIZED: "Unauthorized User.",
            INVALIDE_USER: "Invalide User."
        },
        SERVER: "Internal Server Error.",
        NOT_FOUND: "Data Not Found.",
        INVALIDE_INPUT: "Invalide Input",
        UPDATED: "Error In Updating Status.",
        ROLE: {
            NOT_FOUND: "Role Not Found.",
            ALREADY_EXISTS: "Role Already Exists.",
            INVALIDE_USER: "Invalide User.",
        },
        LEAVE: {
            USED: "All leaves Are Used.",
            CREATED: "Error In Creating Leave Request.",
            NOT_FOUND: "Data Not Found.",
        },
        OTP: {
            SEND: "Could not send OTP email.",
            INVALIDE_INPUT: "Invalide OTP",
        },
        PASSWORD: {
            UPDATE: "Password Reset Successfully."
        }
    }
};
