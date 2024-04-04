import {
  getUserById,
  getAllUsers,
  createUser,
  getUserByEmailId,
} from "../models/userModel.js";
import { createNewSession } from "supertokens-node/recipe/session/index.js";

const getUserByIdController = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await getUserById(userId);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllUsersController = async (req, res) => {
  console.log("getAllUsersController entered");
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createUserController = async (req, res) => {
  const user = req.body;
  console.log("request body", req, res);
  console.log("createUserController entered", user);
  try {
    const newUser = await createUser(user);
    res.json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const loginUserController = async (req, res) => {
  const { email, password } = req.body;
  console.log("response", res)
  console.log("request", req)
  try {
    const userId = await getUserByEmailId(email);
    console.log("userid", userId)
    await createNewSession(res, userId);
    console.log("response", res)
    res.status(200).json({ message: "Login Successful" });
  } catch (error) {
    console.log("Error Creating Session", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  getUserByIdController,
  getAllUsersController,
  createUserController,
  loginUserController,
};
