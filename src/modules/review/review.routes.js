import { Router } from "express";
import { addReview, allReviews, deleteReview, getReview, updateReview } from "./review.controller.js";
import { allowoedTo, protectedRoutes } from "../auth/auth.controller.js";



const reviewRouter = Router()


reviewRouter.route('/')
        .post(protectedRoutes , allowoedTo('user'),addReview)
        .get(allReviews)

reviewRouter.route('/:id')
        .get(getReview)
        .put(protectedRoutes , allowoedTo('user'),updateReview)
        .delete(protectedRoutes , allowoedTo('user','admin'),deleteReview)




export default reviewRouter