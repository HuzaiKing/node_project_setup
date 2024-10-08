import { apiErrorHandler } from "../utils/apiErrorHandler.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.js";
import { uploadonCloudinary } from "../utils/cloudinary.js";
import { apiResonseHandler } from "../utils/apiResponseHandler.js";
const registerUser  = asyncHandler ( async (req,res)=>{
    // Get User Detail From Frontend
    // Validation - not empty
    // check if already exist : Username and email
    // check for images and avatar
    // upload them to cloudinary
    // Create User Object
    // Create entry in DB
    // remove password and refresh token field from response object
    // check for user creation 
    // return response

    //
    const {fullname, email, username, password} = req.body
    console.log("email",email,password)
    // if (fullname==="") throw new apiErrorHandlerHandler(400,'Fullname is required')
    if ([fullname,email,username,password].some((field)=>{
        field?.trim()===""})){
            throw new apiErrorHandler(400,'All fields are required')
        }
    
    const existedUser = User.findOne({
        $or : [{ username },{ email }]
    })
    if(existedUser){
        throw new apiErrorHandler(409,'User With Email/FullName is Already Exist')
    }
    const localAvatarPath = req.files?.avatar[0]?.path
    const localCoverImagePath = req.files?.coverImage[0]?.path
    if (!localAvatarPath) {
        throw new apiErrorHandler(400, 'Avatar is required')
    }

    const avatar = await uploadonCloudinary(localAvatarPath)
    const coverImage = await uploadonCloudinary(localCoverImagePath)

    if (!avatar) {
        throw new apiErrorHandler(400, 'Avatar file is required')
    }

    const user = await User.create({
        fullname,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase()
    })
    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if (!createdUser){
        throw new apiErrorHandler(500,'Something Went wrong while registering the User')
    }

    return res.status(201).json(new apiResonseHandler(200,createdUser,"User Registered Successfully"))
})
export {registerUser}; 