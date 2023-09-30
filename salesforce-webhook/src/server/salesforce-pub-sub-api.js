import PubSubApiClient from "salesforce-pubsub-api-client";
import dotenv from "dotenv";
import path from "path";
dotenv.config();
// require("dotenv").config

const {
  SALESFORCE_LOGIN_URL,
  SALESFORCE_TOKEN,
  SALESFORCE_USERNAME,
  SALESFORCE_ORG_ID,
} = process.env;

const salesforceController = {};

salesforceController.run = async () => {
  try {
    // console.log(process.env.SALESFORCE_LOGIN_URL);
    console.log("instanceUrl: ", SALESFORCE_LOGIN_URL);
    const client = new PubSubApiClient();
    await client.connectWithAuth(
      SALESFORCE_TOKEN,
      SALESFORCE_LOGIN_URL,
      SALESFORCE_ORG_ID,
      SALESFORCE_USERNAME
    );

    const eventEmitter = await client.subscribe(
      "/data/npe01__OppPayment__ChangeEvent",
      25
    );

    // Handle incoming events
    /**
     * info that we need from payment event
     * record ID
     * change field
     */
    eventEmitter.on("data", (event) => {
      console.log(
        `Handling ${event.payload.ChangeEventHeader.entityName} change event ${event.replayId}`
      );
      console.log(JSON.stringify(event, null, 2));
      console.log(
        "changed fields: ",
        JSON.stringify(event.payload.ChangeEventHeader.changedFields)
      );
      /**
       * use changed fields to identify which properties to data capture and then map to a response to create invoice in stripe
       */
    });
  } catch (error) {
    console.error(error);
  }
};

// salesforceController.run();

export default salesforceController;
