import { Router } from "express";
import { addProduct, allProducts, deleteProduct, getProduct, updateProduct } from "./product.controller.js";
import { uploadMixOfFiles } from "../../fileUpload/fileUpload.js";
import { validate } from "../../middleware/validate.js";
import { addProductValidation, updateProductValidation } from "./product.validation.js";


const productRouter = Router()


productRouter.
                route('/').
                post(uploadMixOfFiles([{ name: 'imageCover', maxCount: 1 }, { name: 'images', maxCount: 10 }] , 'products') , 
                validate(addProductValidation) ,addProduct).
                get(allProducts)


productRouter.
                route('/:id').
                get(getProduct).
                put(uploadMixOfFiles([{ name: 'imageCover', maxCount: 1 }, { name: 'images', maxCount: 10 }] , 'products'),
                validate(updateProductValidation),updateProduct).
                delete(deleteProduct)




export default productRouter