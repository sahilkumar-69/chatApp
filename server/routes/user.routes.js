import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { login, signUp, updateProfile ,checkAuth} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/signup", signUp);

userRouter.post("/login", login);

userRouter.put("/update", authMiddleware, updateProfile);

userRouter.get("/check", authMiddleware, checkAuth);

export {userRouter}