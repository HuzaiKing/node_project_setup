import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jsonwebtoken from "jsonwebtoken";
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        required:[true,'Password is Required'],
        lowercase:true,
        unique:true,
        trim:true,
    },
    fullname:{
        type:String,
        required:true,
        trim:true,
    },

    avatar:{
        type:String, //Cloudinary
        required:true,

    },
    coverImage:{
        type:String,
    },
    watchHistory:[{
        type:mongoose.Schema.ObjectId,
        ref:'Video'
    }],
    refreshToken:{
        type:String,
    }
},{timestamps:true})

userSchema.pre('save',async function (next) {
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,10)
    next()
})
userSchema.methods.isPasswordCorrect= async function (password){
    return await bcrypt.compare(password,this.password)
}
userSchema.methods.generateAccessToken =async function (){
    return jsonwebtoken.sign({
        _id:this._id,
        email:this.email,
        fullname:this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
    )
}
userSchema.methods.generateRefreshToken =async function (){
    return jsonwebtoken.sign({
        _id:this._id,
        email:this.email,
        fullname:this.fullname
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
    )
}
export const User = mongoose.model('User',userSchema)