import express, { Router } from "express";
import { checkUsername } from "component/api/auth/check_user_name";
import { login } from "component/api/auth/login";
import { register } from "component/api/auth/register";

const router = express.Router() as Router;

// auth
router.post("/login", login);
router.post("/register", register);
router.post("/api/checkusername", checkUsername);

// router.get("/api", apiController.GET);
// router.post("/edit/song", apiController.postSong);
export default router;
