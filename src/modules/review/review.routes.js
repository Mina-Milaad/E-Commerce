import { Router } from "express";
import { addReview, allReviews, deleteReview, getReview, updateReview } from "./review.controller.js";
import { allowoedTo, protectedRoutes } from "../auth/auth.controller.js";
import { validate } from "../../middleware/validate.js";
import { addReviewValidation, updateReviewValidation } from "./review.validation.js";



const reviewRouter = Router()


reviewRouter.route('/')
        .post(protectedRoutes, allowoedTo('user'), validate(addReviewValidation), addReview)
        .get(allReviews)

reviewRouter.route('/:id')
        .get(getReview)
        .put(protectedRoutes, allowoedTo('user'), validate(updateReviewValidation), updateReview)
        .delete(protectedRoutes, allowoedTo('user', 'admin'), deleteReview)




export default reviewRouter