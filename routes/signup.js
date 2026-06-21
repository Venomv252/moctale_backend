import express from "express";

import asyncHandler from "../utils/asyncHandler";
import {signup} from"../controllers/auth.controller.js"

const router = express.Router();

router.post("/signup",asyncHandler(signup));


// router.post("/signup", async (req, res) => {
//   try {


//     if (!firstName || !lastName || !phone || !username || !password) {
//       res.status(400).json({ message: "Please fill all fields" });
//     }

//     

//     if (existingUser) {
//       return res.status(400).json({ message: "User already exist" });
//     }


//     

//     res.status(201).json({ message: "User successfully sign up" });
//     console.log(newUser);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });
