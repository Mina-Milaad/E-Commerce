import Joi from 'joi';

export const addCartValidation = Joi.object({
    product: Joi.string().length(24).hex(),
    quantity: Joi.number().integer().options({ convert: false }),
});


export const updateQuantityValidation = Joi.object({
    id: Joi.string().length(24).hex(),
    quantity: Joi.number().integer().options({ convert: false }),
});