import { AppError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { Brand } from "../../../databases/models/brand.model.js"
import { Category } from "../../../databases/models/category.model.js"
import slugify from "slugify"
import { Review } from "../../../databases/models/review.model.js"





export const deleteOne = (model) => catchError(async (req, res, next) => {

    if (model == Review) {
        let document = await model.findOneAndDelete({_id : req.params.id , user : req.user._id } , req.body , {new : true})
        !document && next(new AppError("not document found", 404));
        document && res.json({ msg: "success", document });
      }



    let document = await model.findByIdAndDelete(req.params.id)
    document || next(new AppError("document not found", 404))
    !document || res.json({ message: "success", document })
})


// export const getAll = (model) => catchError(async(req , res , next) => {

//     let pageNumber = req.query.page * 1 || 1
//     if(req.query.page) pageNumber = 1
//     const limit = 2
//     let skip = (parseInt(pageNumber)-1) * limit

//     let filterObj ={};
//     if(req.params.category) filterObj.category = req.params.category

//     let documents = await model.find(filterObj).skip(skip).limit(limit)
//     res.json({message : "success" , pageNumber,documents})
// })


export const updateOne = (model) => catchError(async (req, res, next) => {
    if (req.body.name) req.body.slug = slugify(req.body.name)
    if(req.body.title) req.body.slug = slugify(req.body.title)
    if (req.file) {
        if (model == Category) {
            req.body.image = req.file.filename
        } else if (model == Brand) {
            req.body.logo = req.file.filename
        }
    }
        if(req.files?.imageCover){
            req.body.imageCover = req.files?.imageCover[0].filename;
           }
           if(req.files?.images){
            req.body.images = req.files.images?.map(img => img.filename)
           }
    
    let document = await model.findByIdAndUpdate(req.params.id, req.body, { new: true })
    document || next(new AppError("document not found", 404))
    !document || res.json({ message: "success", document })
})