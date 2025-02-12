import { Router } from "express";
import { addCategory, allCategories, deleteCategory, getCategory, updateCategory } from "./category.controller.js";
import { uploadSingleFile } from "../../fileUpload/fileUpload.js";
import { validate } from "../../middleware/validate.js";
import { addCategoryValidation, updateCategoryValidation } from "./category.validation.js";
import subCategoryRouter from "../subcategory/subcategory.routes.js";
import { allowoedTo, protectedRoutes } from "../auth/auth.controller.js";


const categoryRouter = Router()

categoryRouter.use('/:category/subcategories' , subCategoryRouter)

categoryRouter.route('/')
        .post(protectedRoutes, allowoedTo('user' ,'admin') , uploadSingleFile("image" , "categories") , validate(addCategoryValidation) , addCategory)
        .get(allCategories)

categoryRouter.route('/:id')
        .get(getCategory)
        .put(protectedRoutes , allowoedTo('user' , 'admin') ,uploadSingleFile("image" , "categories"),validate(updateCategoryValidation),updateCategory)
        .delete(protectedRoutes,allowoedTo('user' , 'admin'),deleteCategory)




export default categoryRouter 