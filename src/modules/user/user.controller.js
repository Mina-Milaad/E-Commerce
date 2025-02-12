import { AppError } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { deleteOne, updateOne } from "../handlers/handlers.js"
import { ApiFeatures } from "../../utils/apiFeatures.js"
import { User } from "../../../databases/models/user.model.js"



const addUser = catchError(async(req , res , next) => {
      let user = new User(req.body)
      await user.save()
      res.json({message : "success" , user})
})


const allUsers = catchError(async(req , res , next) => {
    let users = await User.find()
    res.json({message : "success" , users})
})


const getUser = catchError(async(req , res , next) => {

    let user = await User.findById(req.params.id)
    user || next(new AppError("user not found" , 404))
    !user || res.json({message : "success" , user})
})


//const updateBrand = updateOne(Brand)


const updateUser = catchError(async(req , res , next) => {

    let user = await User.findByIdAndUpdate(req.params.id , req.body , {new : true})
    user || next(new AppError("brand not found" , 404))
    !user || res.json({message : "success" , user})
})

const deleteUser = deleteOne(User)


export {
    addUser,
    allUsers,
    getUser,
    updateUser,
    deleteUser

}