import { Router } from "express";
import { allowoedTo, protectedRoutes } from "../auth/auth.controller.js";
import { addToCart, applyCoupon, clearUserCart, getLoggedUserCart, removeItemFromCart, updateQuantity } from "./cart.controller.js";


const cartRouter = Router()


cartRouter.route('/')
                .post(protectedRoutes,allowoedTo('user'),addToCart)
                .get(protectedRoutes,allowoedTo('user'),getLoggedUserCart)
                .delete(protectedRoutes,allowoedTo('user' ),clearUserCart)


cartRouter.route('/:id')
                .put(protectedRoutes,allowoedTo('user' ),updateQuantity)
                .delete(protectedRoutes,allowoedTo('user' ),removeItemFromCart)

     
cartRouter.post('/apply-coupon' , protectedRoutes,allowoedTo('user' ) , applyCoupon)



export default cartRouter