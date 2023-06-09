import joi from "joi";

export const signUpSchema = joi.object({
    name: joi.string().required(),
    mail: joi.string().email().required(),
    password: joi.string().min(3).required()
});

export const signInSchema = joi.object({
    mail: joi.string().email().required(),
    password: joi.string().min(3).required()
});