import Joi from 'joi';

export const addUserValidation = Joi.object({
    name: Joi.string().trim().min(1).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});


export const updateUserValidation = Joi.object({
    id: Joi.string().length(24).hex(),


    name: Joi.string().trim().min(1).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});