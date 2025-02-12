import mongoose, { Types } from "mongoose";



const schema = new mongoose.Schema({
    name : {
        type : String,
        unique : [true , 'name is required'],
        trim : true,
        required : true,
        minLenght : [2 , 'too chort category name']
    },
    slug : {
        type : String,
        required : true,
        lowerCase : true,
    },
    logo : String,
    createdBy : {
        type : Types.ObjectId,
        ref : 'User'
    },
} , {timestamps : true , versionKey : false})



schema.post('init' , (docs) => {

    docs.logo = process.env.BASE_URL + "brands/" + docs.logo
})


export const Brand = mongoose.model('Brand' , schema)