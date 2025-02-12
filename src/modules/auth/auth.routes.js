import { Router } from "express";
import { checkEmail } from "../../middleware/checkEmail.js";
import { changeUserPassword, signin, signup } from "./auth.controller.js";



const authRouter = Router()


authRouter.post('/signup' ,checkEmail , signup)
authRouter.post('/signin' , signin)
authRouter.patch('/changePassword' , changeUserPassword)



export default authRouter