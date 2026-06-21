import { generateOtp } from "../services/otp.service.js";
import otpStore from "../services/otpStore.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getOtp = asyncHandler(async (req, res) => {
  const { phone } = req.body;

  const newOtp = generateOtp();

  otpStore.set(phone, newOtp);

  res.status(200).json({ message: "Otp sent", otp: newOtp });
});

export const verifyOtp = asyncHandler(async (req, res) => {
  const { phone, otp } = req.body;

  const storedOtp = otpStore.get(phone);

  const correctOtp = storedOtp == otp;

  if (storedOtp == otp) {
    otpStore.delete(phone);
    res.json({ message: "OTP verified", correctOtp: correctOtp });
  } else {
    correctOtp = false;
    res.json({ message: "Incorrect Otp", correctOtp: correctOtp });
  }
});


