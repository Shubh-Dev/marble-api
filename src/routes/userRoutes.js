import express from "express";
import {
  getUserByIdController,
  getAllUsersController,
  createUserController,
} from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.get("/:id", getUserByIdController);
userRoutes.get("/", getAllUsersController);
userRoutes.post("/", createUserController);

export default userRoutes;
