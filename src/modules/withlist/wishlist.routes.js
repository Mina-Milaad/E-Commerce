import { Router } from "express";
import { addToWishlist, getLoggedUserWishlist, removeFromWishlist } from "./wishlist.controller.js";
import { allowoedTo, protectedRoutes } from "../auth/auth.controller.js";
import { validate } from "../../middleware/validate.js";
import { addWishListValidation } from "./wishlist.validation.js";


const wishRouter = Router()


wishRouter.route('/')
    .patch(protectedRoutes, allowoedTo('user'), validate(addWishListValidation), addToWishlist)
    .get(protectedRoutes, allowoedTo('user', 'admin'), getLoggedUserWishlist)

wishRouter.route('/:id')
    .delete(protectedRoutes, allowoedTo('user', 'admin'), removeFromWishlist)





export default wishRouter