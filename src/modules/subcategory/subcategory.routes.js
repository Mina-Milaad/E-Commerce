import { Router } from "express";
import { addSubCategory, allSubCategories, deleteSubCategory, getSubCategory, updateSubCategory } from "./subcategory.controller.js";
import { checkCategory } from "../../middleware/checkCategoryById.js";
import { validate } from "../../middleware/validate.js";
import { addSupcategoryValidation, updateSupcategoryValidation } from "./subcategory.validation.js";


const subCategoryRouter = Router({mergeParams : true})


subCategoryRouter.route('/').post(validate(addSupcategoryValidation),checkCategory,addSubCategory).get(allSubCategories)
subCategoryRouter.route('/:id').get(getSubCategory).put(validate(updateSupcategoryValidation),updateSubCategory).delete(deleteSubCategory)




export default subCategoryRouter