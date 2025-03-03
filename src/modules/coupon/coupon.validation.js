import Joi from 'joi';

export const addCoupontValidation = Joi.object({
    code: Joi.string().min(1).max(200).trim().required(),
    discount: Joi.number().min(0).required(),
    expires: Joi.date().required(),
});


export const updateCouponValidation = Joi.object({
    id: Joi.string().length(24).hex().required(),

    code: Joi.string().min(1).max(200).trim(),
    discount: Joi.number().min(0),
    expires: Joi.date(),
});