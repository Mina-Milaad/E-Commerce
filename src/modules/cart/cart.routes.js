import { Router } from "express";
import { allowoedTo, protectedRoutes } from "../auth/auth.controller.js";
import { addToCart, applyCoupon, clearUserCart, getLoggedUserCart, removeItemFromCart, updateQuantity } from "./cart.controller.js";
import { validate } from "../../middleware/validate.js";
import { addCartValidation, updateQuantityValidation } from "./cart.validation.js";


const cartRouter = Router()


cartRouter.route('/')
    .post(protectedRoutes, allowoedTo('user'), validate(addCartValidation), addToCart)
    .get(protectedRoutes, allowoedTo('user'), getLoggedUserCart)
    .delete(protectedRoutes, allowoedTo('user'), clearUserCart)


cartRouter.route('/:id')
    .put(protectedRoutes, allowoedTo('user'), validate(updateQuantityValidation), updateQuantity)
    .delete(protectedRoutes, allowoedTo('user'), removeItemFromCart)


cartRouter.post('/apply-coupon', protectedRoutes, allowoedTo('user'), applyCoupon)



export default cartRouter