import Joi from 'joi';

export const signupValidation = Joi.object({
    name: Joi.string().trim().min(1).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});

export const signinValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});

export const changeUserPasswordValidation = Joi.object({
    oldPassword: Joi.string().min(8).required(),
    newPassword: Joi.string().min(8).required(),
    rePassword: Joi.string().valid(Joi.ref('newPassword')).required()
});