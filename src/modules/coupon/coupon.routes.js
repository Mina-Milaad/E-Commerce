import { Router } from "express";
import { addCoupon, allCoupons, deleteCoupon, getCoupon, updateCoupon } from "./coupon.controller.js";
import { allowoedTo, protectedRoutes } from "../auth/auth.controller.js";


const couponRouter = Router()
couponRouter.use(protectedRoutes , allowoedTo('admin'))

couponRouter.route('/').post(addCoupon).get(allCoupons)
couponRouter.route('/:id').get(getCoupon).put(updateCoupon).delete(deleteCoupon)




export default couponRouter