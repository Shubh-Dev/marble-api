import { getUserById, getAllUsers, createUser } from "../models/userModel.js";

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

export { getUserByIdController, getAllUsersController, createUserController };
