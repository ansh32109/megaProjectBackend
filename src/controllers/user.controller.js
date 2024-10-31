import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.models.js"
import {uploadOnCloudinary} from '../utils/Cloudinary.js'
import {ApiResponse} from '../utils/ApiResponse.js'

const registerUser = asyncHandler( async (req, res) => {

    // 1: Get form data
    // 2: Apply validation to check if required fields are present
    // 3: Check if user already exists, using username and email
    // 4: Check if required images exist, such as coverImages and avatar
    // 5: If they exist, upload them to cloudinary and get the uploaded URL
    // 6: Create user object and then create an entry in mongoDB
    // 7: Remove password and refresh token field from the response
    // 8: Check for successful user creation 
    // 9: Return response 

    const {username, fullName, email, password} = req.body
    console.log(`Email is: ${email}`)

    if(
        [username, fullName, email, password].some((field) => field?.trim()==="")
    ){
        throw new ApiError(400, "All fields are compulsory")
    }

    const existingUser = User.findOne({
        $or: [{username}, {email}]
    })

    if(existingUser){
        throw new ApiError(409, "User with the same username or email already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar){
        throw new ApiError(400, "Avatar file is required")
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user, please try again")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User created successfully")
    )

} )

export {registerUser}