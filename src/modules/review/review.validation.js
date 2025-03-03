import Joi from 'joi';

export const addReviewValidation = Joi.object({
    comment: Joi.string().min(1).max(200).trim().required(),
    rate: Joi.number().min(0).max(5).required(),
    product: Joi.string().length(24).hex().required(),
});


export const updateReviewValidation = Joi.object({
    id: Joi.string().length(24).hex().required(),

    comment: Joi.string().min(1).max(200).trim(),
    rate: Joi.number().min(0).max(5),
    product: Joi.string().length(24).hex(),
});