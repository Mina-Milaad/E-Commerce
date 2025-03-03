import joi from 'joi'


export const addWishListValidation = joi.object({
    product: joi.string().length(24).hex().required(),
});


