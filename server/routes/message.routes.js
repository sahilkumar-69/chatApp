import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  getUsersForSidebar,
  getMessages,
  markMessageAsSeen,
  sendMessage,
} from "../controllers/message.controller.js";

const messageRouter = express.Router();

messageRouter.get("/users", authMiddleware, getUsersForSidebar);

messageRouter.get("/:id", authMiddleware, getMessages);

messageRouter.put("/mark/:id", authMiddleware, markMessageAsSeen);

messageRouter.post("/send/:id", authMiddleware, sendMessage);

export { messageRouter };
