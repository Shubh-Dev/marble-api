import express from "express";
import userRoutes from "./src/routes/userRoutes.js";
import { testConnection } from "./src/config/database.js";

const app = express();

app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello, this is the root route!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
    testConnection();
});
