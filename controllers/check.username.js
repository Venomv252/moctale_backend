import { isAvailable } from "../services/check.Phone.js";
import asyncHandler from "../utils/asyncHandler.js";

export const checkusername = asyncHandler(async(req,res)=>{
    const {username} = req.params;

    const available = await isAvailable("username", username);

    res.status(200).json({
        success:true,
        available
    });
});
