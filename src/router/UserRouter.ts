import express from "express";
import { UserController } from "../controller/UserController";

export const userRouter = express.Router();

userRouter.post("/signup", new UserController().signup);
userRouter.get("/login", new UserController().login);
userRouter.post("/friendship", new UserController().createFriendship);
userRouter.delete("/undofriendship", new UserController().undoFriendship);
userRouter.post("/refresh/token/", new UserController().createRefreshToken);


