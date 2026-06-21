import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";

export const isAvailable = async (field,value) =>{

    const existingUser = await User.findOne({[field]:value});

   return !existingUser
} 