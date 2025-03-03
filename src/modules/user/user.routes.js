import { Router } from "express";
import { addUser, allUsers, deleteUser, getUser, updateUser } from "./user.controller.js";
import { checkEmail } from "../../middleware/checkEmail.js";
import { validate } from "../../middleware/validate.js";
import { addUserValidation, updateUserValidation } from "./user.validation.js";


const userRouter = Router()


userRouter.route('/').post(validate(addUserValidation), checkEmail, addUser).get(allUsers)
userRouter.route('/:id').get(getUser).put(validate(updateUserValidation), updateUser).delete(deleteUser)




export default userRouter