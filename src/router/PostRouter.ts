import express from "express";
import { UserController } from "../controller/UserController";

export const postRouter = express.Router();

postRouter.post("/createpost", new UserController().createPost);
postRouter.get("/feed", new UserController().getFeedFriendship);
postRouter.get("feed/type", new UserController().getFeedByType);