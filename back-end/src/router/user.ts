import { Router } from "express";
import { upload } from "../lib/upload.js";
import { userRegister } from "../controllers/user.js";

const router = Router()

router.post("/signup", upload.single('image'), userRegister)
// router.post("/signin", userLogin)
