import { Router } from "express";
import { addBrand, allBrands, deleteBrand, getBrand, updateBrand } from "./brand.controller.js";
import { uploadSingleFile } from "../../fileUpload/fileUpload.js";
import { validate } from "../../middleware/validate.js";
import { addBrandValidation, updateBrandValidation } from "./brand.validation.js";


const brandRouter = Router()


brandRouter.route('/').post(uploadSingleFile("logo" , "brands") ,validate(addBrandValidation), addBrand).get(allBrands)
brandRouter.route('/:id').get(getBrand).put(uploadSingleFile("logo" ,"brands"), validate(updateBrandValidation) , updateBrand).delete(deleteBrand)




export default brandRouter