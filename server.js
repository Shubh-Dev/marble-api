import express from "express";
import SuperTokens from "supertokens-node";

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
    });

    app.use(SuperTokens.middleware());

    
