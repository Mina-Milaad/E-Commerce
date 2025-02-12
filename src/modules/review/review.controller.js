import slugify from "slugify"
import { AppError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { Brand } from "../../../databases/models/brand.model.js"
import { deleteOne, updateOne } from "../handlers/handlers.js"
import { ApiFeatures } from "../../utils/apiFeatures.js"
import { Review } from "../../../databases/models/review.model.js"



const addReview = catchError(async(req , res , next) => {
      req.body.user = req.user._id

      let isExist = await Review.findOne({user : req.user._id , product : req.body.product})
      if(isExist) return next(new AppError('you created a review before' , 409))

      let review = new Review(req.body)
      await review.save()
      res.json({message : "success" , review})
})


const allReviews = catchError(async(req , res , next) => {


    let apiFeatures = new ApiFeatures(Review.find() , req.query)
           .pagination().fields().filter().sort().search()
     let reviews = await apiFeatures.mongooseQuery
     res.json({message : "success" , page : apiFeatures.pageNumber , reviews})


})


const getReview = catchError(async(req , res , next) => {

    let review = await Review.findById(req.params.id)
    review || next(new AppError("review not found" , 404))
    !review || res.json({message : "success" , review})
})


//const updateBrand = updateOne(Brand)


const updateReview = catchError(async(req , res , next) => {
    let review = await Review.findOneAndUpdate({_id : req.params.id , user : req.user._id } , req.body , {new : true})
    review || next(new AppError("review not found or you are not created this review" , 404))
    !review || res.json({message : "success" , review})
})

const deleteReview = deleteOne(Review)


export {
    addReview,
    allReviews,
    getReview,
    updateReview,
    deleteReview

}