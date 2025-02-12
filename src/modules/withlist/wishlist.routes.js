import { Router } from "express";
import { addToWishlist, getLoggedUserWishlist, removeFromWishlist } from "./wishlist.controller.js";
import { allowoedTo, protectedRoutes } from "../auth/auth.controller.js";


const wishRouter = Router()


wishRouter.route('/')
                .patch(protectedRoutes,allowoedTo('user'),addToWishlist)
                .get(protectedRoutes,allowoedTo('user','admin'),getLoggedUserWishlist)

wishRouter.route('/:id')
                .delete(protectedRoutes,allowoedTo('user' , 'admin'),removeFromWishlist)
     




export default wishRouter