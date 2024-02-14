import dotenv from "dotenv";
import express, { response } from "express";
import bodyParser from "body-parser";
import userRoutes from "./src/routes/userRoutes.js";
import candidateRoutes from "./src/routes/candidateRoutes.js";
import cors from "cors";
import SuperTokens from "supertokens-node";
// import { Dropbox } from "dropbox";

dotenv.config();
const accessToken = process.env.DROPBOX_ACCESS_TOKEN;

// const dbx = new Dropbox({ accessToken, fetch });
// let directLink = "";

// dbx
//   .filesListFolder({ path: "" })
//   .then((response) => {
//     const fileName = response.result.entries[0];
//     directLink = dbx.filesGetTemporaryLink({ path: fileName.path_display });
//     console.log(directLink);
//   })
//   .catch((error) => {
//     console.log("dropbox fetch error lone 20", error);
//   });

// const getDropboxDirectLink = async () => {
//   try {
//     const response = await dbx.filesListFolder({ path: "" });
//     const fileName = response.result.entries[0];
//     const directLink = await dbx.filesGetTemporaryLink({
//       path: fileName.path_display,
//     });
//     console.log(directLink);
//   } catch (error) {
//     console.log("dropbox fetch error lone 20", error);
//   }
// };

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/users", userRoutes);
app.use("/candidates", candidateRoutes);

app.get("/", (req, res) => {
  res.send("Hello, this is the root route!");
});

const PORT = process.env.PORT || 3000;
// getDropboxDirectLink();

console.log("PORT", PORT);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
