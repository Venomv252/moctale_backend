import express from "express";
import { validate } from "../middleware/validate.middleware";

const router = express.Router();

router.post("/add",validate2())