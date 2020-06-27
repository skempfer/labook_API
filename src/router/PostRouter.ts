import express from "express";
import { PostController } from "../controller/PostController";

export const postRouter = express.Router();

postRouter.post("/createpost", new PostController().createPost);
postRouter.get("/feed", new PostController().getFeedAnd);
postRouter.get("feed/type", new PostController().getFeedByTypeAndPage);