import Joi from 'joi';

export const addAddressValidation = Joi.object({
    street: Joi.string().trim().min(2).required(),
    phone: Joi.string().trim().min(2).required(),
    city: Joi.string().trim().min(2).required(),
});


