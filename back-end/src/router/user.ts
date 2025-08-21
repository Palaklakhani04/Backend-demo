import { Router } from "express";
import { upload } from "../lib/upload";
import { updateUserDetail, userLogin, userRegister } from "../controllers/user";
import { UniqueUserRegister, verifyUserAuthorization } from "../middleware/auth";

const router = Router()

router.post("/signup", upload.single("image"), UniqueUserRegister, userRegister)
router.post("/signin", userLogin)
router.put("/update", upload.single("image"), verifyUserAuthorization, updateUserDetail)

export default router

