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
        unique : [true , 'name is required'],

    },
    image : String,
    createdBy : {
        type : Types.ObjectId,
        ref : 'User'
    },
} , {timestamps : true , versionKey : false})


schema.post('init' , (docs) => {

    if(docs.image) docs.image = process.env.BASE_URL + "/categories/" + docs.image
})



export const Category = mongoose.model('Category' , schema)