import express from "express";
import { PostController } from "../controller/PostController";

export const postRouter = express.Router();

postRouter.post("/createpost", new PostController().createPost);
postRouter.get("/feed/:page", new PostController().getFeedAndPage);
postRouter.get("/feed/:type/:page", new PostController().getFeedByTypeAndPage);
postRouter.post("/post/like"), new PostController().likePost;