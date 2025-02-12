import { Category } from "../../databases/models/category.model.js";
import { AppError } from "../utils/appError.js";



export const checkCategory = async(req , res , next) =>{

    let category = await Category.findById(req.body.category);
    if(!category){
        next(new AppError("category not found",404))
    }
    next()

}