import { Router } from "express";
import { allowoedTo, protectedRoutes } from "../auth/auth.controller.js";
import { createCashOrder, createCheckoutSession, getAllOrders, getUserOrders } from "./order.controller.js";
import { validate } from "../../middleware/validate.js";
import { createCashOrderValidation, createCheckOutSessionsValidation } from "./order.validation.js";


const orderRouter = Router()


orderRouter.route('/')
    .get(protectedRoutes, allowoedTo('admin'), getAllOrders)

orderRouter.get('/users', protectedRoutes, allowoedTo('user', 'admin'), getUserOrders)


orderRouter.route('/:id')
    .post(protectedRoutes, allowoedTo('user'), validate(createCashOrderValidation), createCashOrder)

orderRouter.post('/checkout/:id', protectedRoutes, allowoedTo('user'), validate(createCheckOutSessionsValidation), createCheckoutSession)

export default orderRouter
