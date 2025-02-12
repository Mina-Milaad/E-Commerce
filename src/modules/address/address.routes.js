import { Router } from "express";
import { addAddress, getLoggedUserAddress, removeAddress } from "./address.controller.js";
import { allowoedTo, protectedRoutes } from "../auth/auth.controller.js";


const addressRouter = Router()


addressRouter.route('/')
                .patch(protectedRoutes,allowoedTo('user'),addAddress)
                .get(protectedRoutes,allowoedTo('user','admin'),getLoggedUserAddress)

addressRouter.route('/:id')
                .delete(protectedRoutes,allowoedTo('user' , 'admin'),removeAddress)
     




export default addressRouter