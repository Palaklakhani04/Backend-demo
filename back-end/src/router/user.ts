import { Router } from "express";
import { upload } from "../lib/upload";
import { forgetPsw, logout, resetPsw, updateUserDetail, userLogin, userRegister } from "../controllers/user";
import { UniqueUserRegister, verifyUserAuthorization } from "../middleware/auth";

const router = Router()

router.post("/signup", upload.single("image"), UniqueUserRegister, userRegister)
router.post("/signin", userLogin)
router.put("/update", verifyUserAuthorization, updateUserDetail)
router.post("/logout", logout)
router.post("/forget", forgetPsw)
router.post("/reset", resetPsw)

export default router

