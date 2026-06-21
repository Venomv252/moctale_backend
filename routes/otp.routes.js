import express from "express";
import {getOtp,verifyOtp } from "../controllers/otp.controllers.js";
import {validate} from "../middleware/validate.middleware.js";
import { phoneSchema } from "../validators/phone.check.validator.js";
import { otpSchema } from "../validators/otp.validator.js";
const router = express.Router();

router.post("/getOtp",validate(phoneSchema),getOtp);
router.post("/verifyOtp",validate(otpSchema),verifyOtp);

export default router;