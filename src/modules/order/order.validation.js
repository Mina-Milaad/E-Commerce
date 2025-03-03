import Joi from 'joi';

export const createCashOrderValidation = Joi.object({
    id: Joi.string().length(24).hex(),
    shippingAddress: Joi.object({
        street: Joi.string().required().trim(),
        city: Joi.string().required().trim(),
        phone: Joi.string().required().trim(),
    }).required(),
});


export const createCheckOutSessionsValidation = Joi.object({
    id: Joi.string().length(24).hex(),
    shippingAddress: Joi.object({
        street: Joi.string().required().trim(),
        city: Joi.string().required().trim(),
        phone: Joi.string().required().trim(),
    }),
});