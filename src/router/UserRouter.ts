import express from "express";
import { UserController } from "../controller/UserController";

export const userRouter = express.Router();

userRouter.post("/", new UserController().signup);

userRouter.post("/friendship", new UserController().friendship);

userRouter.get("/login", new UserController().login);
