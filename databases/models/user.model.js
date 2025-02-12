import mongoose, { Types } from "mongoose";
import bcrybt from 'bcrypt'

const schema = new mongoose.Schema({
    name : String,
    email : String,
    password : String,
    isBlocked : {
        type : Boolean,
        default : false
    },
    role : {
        type : String,
        enum : ['admin' , 'user'],
        default : 'user'
    },
    passwordChangedAt : Date,

    wishlist : [{type:Types.ObjectId,ref : "Product"}],
    addresses : [{
        city : String,
        phone : String,
        street : String,
    }]
} , {timestamps : true , versionKey : false})


schema.pre('save' , function() {
    this.password = bcrybt.hashSync(this.password , 8)
})

schema.pre('findOneAndUpdate' , function() {
    if(this._update.password ) this._update.password = bcrybt.hashSync(this._update.password , 8)
})

export const User = mongoose.model('User' , schema)