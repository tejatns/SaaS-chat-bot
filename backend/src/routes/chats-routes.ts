import {Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { ChatCompletionValidator, validate } from "../utils/validators.js";
import { deleteCHats, generateChatCompletion, sendChatsToUser } from "../controllers/chat-controllers.js";

const chatRoutes = Router();
chatRoutes.post("/new",validate(ChatCompletionValidator),verifyToken,generateChatCompletion);
chatRoutes.get("/all-chats",verifyToken,sendChatsToUser);
chatRoutes.delete("/delete",verifyToken,deleteCHats);

export default chatRoutes;

