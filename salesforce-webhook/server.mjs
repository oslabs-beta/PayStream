import express from "express";

import salesforceController from "./salesforce-pub-sub-api.mjs";
const port = process.env.PORT || 4242;
const app = express();
app.use(express.json());

/**
 * open salesforce pub-sub API connection
 */
// await getToken();
salesforceController();
// app.use()

app.listen(port, () => console.log("server is listening on port 3030"));
