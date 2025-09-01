import Joi, { required } from "joi";

export const signUpSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    gender: Joi.string().required(),
    grNumber: Joi.string().optional(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    department: Joi.string().optional(),
    className: Joi.string().optional(),
    roleId: Joi.string().required()
})

export const roleSchema = Joi.object({
    name: Joi.string().required(),
    priority: Joi.number().required()
})

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

export const updateUserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    gender: Joi.string().required(),
    grNumber: Joi.string().optional(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    department: Joi.string().optional(),
    className: Joi.string().optional(),
    roleId: Joi.number().required()
})

export const leaveRequestSchema = Joi.object({
    startDate: Joi.string().required(),
    endDate: Joi.string().required(),
    requestToId: Joi.string().required(),
    reason: Joi.string().required(),
    leaveType: Joi.string().valid('firstHalf','secondeHalf','fullDay').required(),
    status: Joi.string().default("Pending").valid('Pending','Approved','Rejected').required()
})

