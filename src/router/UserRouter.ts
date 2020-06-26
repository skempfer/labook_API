import express from "express";
import { UserController } from "../controller/UserController";

export const userRouter = express.Router();

userRouter.post("/signup", new UserController().signup);

userRouter.post("/friendship", new UserController().createFriendship);

userRouter.post("/login", new UserController().login);

userRouter.post("/createpost", new UserController().createPost);
