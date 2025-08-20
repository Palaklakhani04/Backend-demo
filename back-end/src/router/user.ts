import { Router } from "express";
import { upload } from "../lib/upload";
import { userLogin, userRegister } from "../controllers/user";

const router = Router()

router.post("/signup", upload.single("image"), userRegister)
router.post("/signin", userLogin)

export default router

