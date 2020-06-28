import express from "express";
import { PostController } from "../controller/PostController";

export const postRouter = express.Router();

postRouter.post("/create", new PostController().createPost);
postRouter.get("/feed/:page", new PostController().getFeedAndPage);
postRouter.get("/feed/:type/:page", new PostController().getFeedByTypeAndPage);
postRouter.post("/post/like/:postId"), new PostController().likePost;
postRouter.delete("/post/dislike/:postId"), new PostController().dislikePost;
postRouter.post("/post/comment"), new PostController().comment;