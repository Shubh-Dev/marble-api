import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./src/routes/userRoutes.js";
import candidateRoutes from "./src/routes/candidateRoutes.js";
import cors from "cors";
import SuperTokens from "supertokens-node";
import Session from "supertokens-node/recipe/session/index.js";
import { middleware } from "supertokens-node/framework/express/index.js";
import { verifySession } from "supertokens-node/recipe/session/framework/express/index.js";

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

app.use(bodyParser.json());
app.use(cors());

SuperTokens.init({
  framework: "express",
  supertokens: {
    connectionURI: "https://try.supertokens.com",
  },
  appInfo: {
    appName: "marble api",
    apiDomain: "http://localhost:3000",
    websiteDomain: "http://localhost:3000",
    apiBasePath: "/",
    websiteBasePath: "/",
  },

  recipeList: [
    Session.init({
      // antiCsrf: "VIA_TOKEN",
    }),
  ],
});

app.use(middleware());
console.log(verifySession);

app.use("/users", userRoutes);
app.use("/candidates", verifySession(), candidateRoutes);

app.get("/", (req, res) => {
  res.send("Hello, this is the root route!");
});

const PORT = process.env.PORT || 3000;
// getDropboxDirectLink();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
