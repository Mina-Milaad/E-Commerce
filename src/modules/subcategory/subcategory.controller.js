import slugify from "slugify"
import { AppError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { subCategory } from "../../../databases/models/subCategory.model.js"
import { Category } from "../../../databases/models/category.model.js"
import { deleteOne, updateOne } from "../handlers/handlers.js"
import { ApiFeatures } from "../../utils/apiFeatures.js"



const addSubCategory = catchError(async(req , res , next) => {
    
      req.body.slug = slugify(req.body.name)
      let subcategory = new subCategory(req.body)
      await subcategory.save()
      res.json({message : "success" , subcategory})
})



const allSubCategories = catchError(async(req , res , next) => {

    let filterObj ={};
    if(req.params.category) filterObj.category = req.params.category

    let apiFeatures = new ApiFeatures(subCategory.find(filterObj) , req.query)
           .pagination().fields().filter().sort().search()
     let subcategories = await apiFeatures.mongooseQuery
     res.json({message : "success" , page : apiFeatures.pageNumber , subcategories})

})


const getSubCategory = catchError(async(req , res , next) => {

    let subcategory = await subCategory.findById(req.params.id)
    subcategory || next(new AppError("Subcategory not found" , 404))
    !subcategory || res.json({message : "success" , subcategory})
})


//const updateSubCategory = updateOne(subCategory)


const updateSubCategory = catchError(async(req , res , next) => {
    req.body.slug = slugify(req.body.name)
    let subcategory = await subCategory.findByIdAndUpdate(req.params.id , req.body , {new : true})
    subcategory || next(new AppError("Subcategory not found" , 404))
    !subcategory || res.json({message : "success" , subcategory})
})

const deleteSubCategory = deleteOne(subCategory)

export {
    addSubCategory,
    allSubCategories,
    getSubCategory,
    updateSubCategory,
    deleteSubCategory

}