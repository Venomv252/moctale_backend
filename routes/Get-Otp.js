import express from "express";
import otpStore from "../services/otpStore.js";

const Otp = express.Router();

Otp.post("/get-otp", (req, res) => {
  const { phone } = req.body;

  const newOtp = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, "0");

  otpStore.set(phone, newOtp);

  console.log("OTP : ", newOtp);

  res.json({ message: "Otp sent", otp: newOtp });
});

Otp.post("/verify-otp", async (req, res) => {
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

export default Otp;
