import { isAvailable } from "../services/check.Phone.js";
import asyncHandler from "../utils/asyncHandler.js";

export const checkPhone = asyncHandler(async (req, res) => {
    const { phone } = req.params;

    const available = await isAvailable("phone",phone);

    res.status(200).json({
        success: true,
        available
    });
});