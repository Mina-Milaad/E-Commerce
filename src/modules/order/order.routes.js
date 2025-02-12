import { Router } from "express";
import { allowoedTo, protectedRoutes } from "../auth/auth.controller.js";
import { createCashOrder, createCheckoutSession, getAllOrders, getUserOrders } from "./order.controller.js";


const orderRouter = Router()


orderRouter.route('/')
                .get(protectedRoutes,allowoedTo('admin'),getAllOrders)
                
orderRouter.get('/users' , protectedRoutes,allowoedTo('user' , 'admin') , getUserOrders)


orderRouter.route('/:id')
                .post(protectedRoutes,allowoedTo('user' ),createCashOrder)

orderRouter.post('/checkout/:id' , protectedRoutes,allowoedTo('user' ) , createCheckoutSession)

export default orderRouter

//e-commerce
//DjbNGLIGkPT7Nkgd