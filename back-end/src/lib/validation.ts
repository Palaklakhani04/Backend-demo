import Joi from "joi";

export const signUpSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    gender: Joi.string().required(),
    image: Joi.string().required(),
    grNumber: Joi.string().optional(),
    phone: Joi.string().required(),
    addres: Joi.string().required(),
    department: Joi.string().optional(),
    class: Joi.string().optional(),
    roleId: Joi.number().required()
})