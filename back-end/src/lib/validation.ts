import Joi from "joi";

export const signUpSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    gender: Joi.string().required(),
    grNumber: Joi.string().optional(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    department: Joi.string().optional(),
    class: Joi.string().optional(),
    roleId: Joi.number().required()
})

export const roleSchema = Joi.object({
    name: Joi.string().required(),
    priority: Joi.number().required()
})

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

export const updateStudentSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    gender: Joi.string().required(),
    grNumber: Joi.string().optional(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    department: Joi.string().optional(),
    class: Joi.string().optional(),
    roleId: Joi.number().required()
})