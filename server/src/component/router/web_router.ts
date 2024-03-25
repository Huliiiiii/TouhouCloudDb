import apiRouter from "component/api/api_router";
import { checkUsername } from "component/api/auth/check_user_name";
import { login } from "component/api/auth/login";
import { register } from "component/api/auth/register";
import { Router } from "express";

const router = Router();

// auth
router.post("/login", login);
router.post("/register", register);
router.post("/api/checkusername", checkUsername);

router.use(apiRouter);

export default router;
