import { Router } from "express";
import { upload } from "../lib/upload";
import { logout, updateUserDetail, userLogin, userRegister } from "../controllers/user";
import { UniqueUserRegister, verifyUserAuthorization } from "../middleware/auth";

const router = Router()

router.post("/signup", upload.single("image"), UniqueUserRegister, userRegister)
router.post("/signin", userLogin)
router.put("/update", verifyUserAuthorization, updateUserDetail)
router.post("/logout", logout)

export default router

