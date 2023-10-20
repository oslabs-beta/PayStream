import express from "express";
import salesforceController from "./salesforce-pub-sub-api.js";
// import { getToken } from "./token-refresh.js";

const app = express();
app.use(express.json());

/**
 * open salesforce pub-sub API connection
 */
// await getToken();
salesforceController();
// app.use()

app.listen(3030, () => console.log("server is listening on port 3030"));
