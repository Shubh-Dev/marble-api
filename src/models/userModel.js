import db from "../config/database.js";

const getUserById = async (userId) => {
  console.log("user model entered");
  try {
    return await db.oneOrNone("SELECT * FROM users WHERE id = $1", [userId]);
  } catch (err) {
    throw err;
  }
};

const getUserByEmailId = async (email) => {
  try {
    const user = await db.oneOrNone("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return user ? id : null;
  } catch (err) {
    throw err;
  }
};

const getAllUsers = async () => {
  try {
    return await db.manyOrNone("SELECT * FROM users");
  } catch (err) {
    throw err;
  }
};

const createUser = async (user) => {
  console.log("createUser method", user);
  try {
    return await db.one(
      "INSERT INTO users (name, password, email, contact, is_admin) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [user.name, user.password, user.email, user.contact, user.is_admin]
    );
  } catch (err) {
    throw err;
  }
};

export { getUserById, createUser, getAllUsers, getUserByEmailId };
