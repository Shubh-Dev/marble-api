import express from "express";
import {
  getUserByIdController,
  getAllUsersController,
  createUserController,
  loginUserController,
} from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.get("/:id", getUserByIdController);
userRoutes.get("/", getAllUsersController);
userRoutes.post("/register", createUserController);
userRoutes.post("/login", loginUserController)

export default userRoutes;
