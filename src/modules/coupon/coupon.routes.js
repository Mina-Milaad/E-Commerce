import { Router } from "express";
import { addCoupon, allCoupons, deleteCoupon, getCoupon, updateCoupon } from "./coupon.controller.js";
import { allowoedTo, protectedRoutes } from "../auth/auth.controller.js";
import { validate } from "../../middleware/validate.js";
import { addCoupontValidation, updateCouponValidation } from "./coupon.validation.js";


const couponRouter = Router()
couponRouter.use(protectedRoutes, allowoedTo('admin'))

couponRouter.route('/').post(validate(addCoupontValidation), addCoupon).get(allCoupons)
couponRouter.route('/:id').get(getCoupon).put(validate(updateCouponValidation), updateCoupon).delete(deleteCoupon)




export default couponRouter