

import joi from 'joi'

const addProductValidation = joi.object({
      title : joi.string().min(2).max(50).required(),
      description : joi.string().trim().required().min(2).max(2000),
      imageCover: joi.array()
        .items(
          joi.object({
            fieldname: joi.string().required(),
            originalname: joi.string().required(),
            encoding: joi.string().required(),
            mimetype: joi.string()
              .valid("image/png", "image/jpg", "image/jpeg")
              .required(),
            destination: joi.string().required(),
            filename: joi.string().required(),
            path: joi.string().required(),
            size: joi.number().max(5242880).required(),
          })
        ).required(),

      images: joi.array()
        .items(
          joi.object({
            fieldname: joi.string().required(),
            originalname: joi.string().required(),
            encoding: joi.string().required(),
            mimetype: joi.string()
              .valid("image/png", "image/jpg", "image/jpeg")
              .required(),
            destination: joi.string().required(),
            filename: joi.string().required(),
            path: joi.string().required(),
            size: joi.number().max(5242880).required(),
          })
        ).required(),

        price: joi.number().required().min(0),
        priceAfterDiscount: joi.number().optional(),
        sold : joi.number(),
        stock : joi.number().min(0),
        // category: joi.string().length(24).hex().required(),
        // subCategory: joi.string().length(24).hex().required(),
        // brand: joi.string().length(24).hex().required(),
        rateAvg : joi.number().min(0).max(5),
        rateCount : joi.number(),
})





const updateProductValidation = joi.object({

  id: joi.string().length(24).hex().required(),

  title : joi.string().min(2).max(50),
  description : joi.string().trim().min(2).max(2000),
  imageCover: joi.array()
    .items(
      joi.object({
        fieldname: joi.string().required(),
        originalname: joi.string().required(),
        encoding: joi.string().required(),
        mimetype: joi.string()
          .valid("image/png", "image/jpg", "image/jpeg")
          .required(),
        destination: joi.string().required(),
        filename: joi.string().required(),
        path: joi.string().required(),
        size: joi.number().max(5242880).required(),
      })
    ),

  images: joi.array()
    .items(
      joi.object({
        fieldname: joi.string().required(),
        originalname: joi.string().required(),
        encoding: joi.string().required(),
        mimetype: joi.string()
          .valid("image/png", "image/jpg", "image/jpeg")
          .required(),
        destination: joi.string().required(),
        filename: joi.string().required(),
        path: joi.string().required(),
        size: joi.number().max(5242880).required(),
      })
    ),

    price: joi.number().min(0),
    priceAfterDiscount: joi.number().optional(),
    sold : joi.number(),
    stock : joi.number().min(0),
    category: joi.string().length(24).hex(),
    subCategory: joi.string().length(24).hex(),
    brand: joi.string().length(24).hex(),
    rateAvg : joi.number().min(0).max(5),
    rateCount : joi.number(),
})



export {
  addProductValidation,
  updateProductValidation

}
