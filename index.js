import dotenv from "dotenv";
import express from "express";
import userRoutes from "./src/routes/userRoutes.js";

dotenv.config();

const app = express();

app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello, this is the root route!");
});

const PORT = process.env.PORT || 3000;

console.log("PORT", PORT);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
