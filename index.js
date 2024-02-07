import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./src/routes/userRoutes.js";
import candidateRoutes from "./src/routes/candidateRoutes.js";
import SuperTokens from "supertokens-node";

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use("/users", userRoutes);
app.use("/candidates", candidateRoutes);

app.get("/", (req, res) => {
  res.send("Hello, this is the root route!");
});

const PORT = process.env.PORT || 3000;

console.log("PORT", PORT);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
