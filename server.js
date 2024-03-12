import express from "express";
import SuperTokens from "supertokens-node";
import Multitenancy from "supertokens-node/recipe/multitenancy/index.js";
import { verifySession } from "supertokens-node/recipe/session/framework/express/index.js";
import {
  middleware,
  errorHandler,
} from "supertokens-node/framework/express/index.js";

const app = express();
const PORT = process.env.PORT || 3000;

SuperTokens.init({
  supertokens: {
    connectionURI: "https://try.supertokens.io",
  },
  appInfo: {
    appName: "SuperTokens",
    apiDomain: "http://localhost:3000",
    websiteDomain: "http://localhost:3000",
  },
  recipeList: [Multitenancy.init()],
});

console.log("verifySession", verifySession);
app.use(middleware());

app.get("/sessioninfo", verifySession(), async (req, res) => {
  try {
    if (req.session) {
      let session = req.session;
      res.send({
        sessionHandle: session.getHandle(),
        userId: session.getUserId(),
        accessTokenPayload: session.getAccessTokenPayload(),
      });
    } else {
      res.status(401).send("Unauthorized");
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

app.get("/", (req, res) => {
  res.send("Hello, this is the root route!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
