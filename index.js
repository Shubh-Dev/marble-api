import dotenv from "dotenv";
import express, { response } from "express";
import bodyParser from "body-parser";
import userRoutes from "./src/routes/userRoutes.js";
import candidateRoutes from "./src/routes/candidateRoutes.js";
import cors from "cors";
import supertokens from "supertokens-node";
// import { middleware, errorHandler, SessionRequest } from "supertokens-node/lib/build/framework/express/framework.js";
import {
  middleware,
  errorHandler,
  SessionRequest,
} from "supertokens-node/framework/express";
// import { getWebsiteDomain, SuperTokensConfig } from "./src/config/supertokensConfig.js";
import { getWebsiteDomain, SuperTokensConfig } from "./config";
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

supertokens.init(SuperTokensConfig);
const app = express();
app.use(cors({
  origin: getWebsiteDomain(),
  allowedHeaders: ["Content-Type", ...supertokens.getAllCORSHeaders()],
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true,
}));
app.use(bodyParser.json());
app.use(middleware);

//  for testing
app.get("/sessioninfo", verifySession(), async (req, res) => {
  let session = req.session;
  req.send({
    sessionHandle: session.getHandle(),
    userId: session.getUserId(),
    accessTokenPayload: session.getAccessTokenPayload(),
  });
  })


// want to implement supertokens here
app.use("/users", userRoutes);
app.use("/candidates", verifySession(), candidateRoutes);

app.get("/", (req, res) => {
  res.send("Hello, this is the root route!");
});

const PORT = process.env.PORT || 3000;
// getDropboxDirectLink();

console.log("PORT", PORT);
app.use(errorHandler());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
