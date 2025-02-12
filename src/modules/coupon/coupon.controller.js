import slugify from "slugify"
import { AppError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { Brand } from "../../../databases/models/brand.model.js"
import { deleteOne, updateOne } from "../handlers/handlers.js"
import { ApiFeatures } from "../../utils/apiFeatures.js"
import { Coupon } from "../../../databases/models/coupon.model.js"



const addCoupon = catchError(async(req , res , next) => {
      let isExist = await Coupon.findOne({code : req.body.code})
      if (isExist) return next(new AppError('coupon is exist' , 409))
      let coupon = new Coupon(req.body)
      await coupon.save()
      res.json({message : "success" , coupon})
})


const allCoupons = catchError(async(req , res , next) => {


     let coupons = await Coupon.find()
     res.json({message : "success" ,coupons})


})


const getCoupon = catchError(async(req , res , next) => {

    let coupon = await Coupon.findById(req.params.id)
    coupon || next(new AppError("brand not found" , 404))
    !coupon || res.json({message : "success" , coupon})
})


//const updateBrand = updateOne(Brand)


const updateCoupon = catchError(async(req , res , next) => {
    let coupon = await Coupon.findByIdAndUpdate(req.params.id , req.body , {new : true})
    coupon || next(new AppError("brand not found" , 404))
    !coupon || res.json({message : "success" , coupon})
})

const deleteCoupon = deleteOne(Coupon)


export {
    addCoupon,
    allCoupons,
    getCoupon,
    updateCoupon,
    deleteCoupon

}