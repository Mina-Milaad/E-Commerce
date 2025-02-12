import mongoose, { Types } from "mongoose";



const schema = new mongoose.Schema({
    name : {
        type : String,
        unique : [true , 'name must unique'],
        trim : true,
        required : [true, "name is required"],
        minLenght : [2 , 'too chort category name']
    },
    slug : {
        type : String,
        required : true,
        lowerCase : true,
    },
    category : {
        type : Types.ObjectId,
        ref : "Category"
    },
    createdBy : {
        type : Types.ObjectId,
        ref : 'User'
    },
} , {timestamps : true , versionKey : false})


export const subCategory = mongoose.model('subCategory' , schema)