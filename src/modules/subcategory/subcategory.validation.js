import joi from 'joi'


const addSupcategoryValidation = joi.object({
    name : joi.string().min(2).max(50).required().trim(),
    category: joi.string().length(24).hex().required(),
})



const updateSupcategoryValidation = joi.object({
    id: joi.string().length(24).hex().required(),

    name : joi.string().min(2).max(50).trim(),
    category: joi.string().length(24).hex(),
})



export {
    addSupcategoryValidation,
    updateSupcategoryValidation
}