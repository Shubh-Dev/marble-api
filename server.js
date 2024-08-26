import express from "express";
import SuperTokens from "supertokens-node";
import Session from "supertokens-node/recipe/session/index.js";
import { middleware } from "supertokens-node/framework/express/index.js";
import { verifySession } from "supertokens-node/recipe/session/framework/express/index.js";
import ThirdPartyEmailPassword from "supertokens-node/recipe/thirdpartyemailpassword/index.js";

const app = express();
const PORT = 3000;
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

  recipeList: [ThirdPartyEmailPassword.init({}), Session.init({})],
});

app.use(middleware());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/sessioninfo", verifySession(), async (req, res) => {
  console.log("session", req.session);
  try {
    if (req.session && req.session.isAuthenticated()) {
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
