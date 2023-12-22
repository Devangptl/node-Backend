import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const userSchema = new mongoose.Schema({

    username : {
        type : String,
        requred : true,
        unique : true,
        lowercase : true,
        trim : true,
        index : true
    },

    email : {
        type : String,
        requred : true,
        unique : true,
        lowercase : true,
        trim : true,
    },

    fullName : {
        type : String,
        requred : true,
        trim : true,
        index : true
    },

    avatar : {
        type : String,  // cloudinary url
        requred : true,
    },

    coverImage : {
        type : String,  // cloudinary url
    },

    watchHistory : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Video"
        }
    ],

    password : {
        type : String,
        requred : [true , " Password is required"]
    },

    refreshToken : {
        type : String
    }


}, 

{timestamps : true})

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next()

    this.password = bcrypt.hash(this.password , 10)
    next()
} )

userSchema.methods.isPasswordCorrect = async function(password){
   return await bcrypt.compare(password , this.password)
}

userSchema.method.generateAccessToken = function(){
    return jwt.sign(
        {
        _id: this._id,
        email : this.email,
        username : this.username,
        fullName : this.fullName
        },
        
        process.env.ACCESS_TOKEN_SECRET,

        {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )

}

userSchema.method.generateRefreshToken = function(){

    return jwt.sign(
        {
        _id: this._id,
        },
        
        process.env.REFRESH_TOKEN_SECRET,

        {
        expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User" , userSchema)