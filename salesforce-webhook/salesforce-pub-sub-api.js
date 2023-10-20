import PubSubApiClient from "salesforce-pubsub-api-client";
import dotenv from "dotenv";
import {
  retreiveOppType,
  createStripeInvoice,
  updateSalesforceStripeId,
  getPaymentType,
} from "./fetchSalesforceAPI.js";
import eventHandler from "./salesforceEventHandler.js";

dotenv.config();

//destructure assignemtn for env variables
const {
  SALESFORCE_LOGIN_URL,
  SALESFORCE_TOKEN,
  SALESFORCE_USERNAME,
  SALESFORCE_ORG_ID,
} = process.env;

/**
 * PubSub API - webhook for listening to Salesforce Payment record changes adn handling events based on their type
 */
const salesforceController = async () => {
  try {
    const client = new PubSubApiClient();
    console.log("instanceUrl: ", SALESFORCE_LOGIN_URL);
    //create new connection

    //open new connection
    await client.connectWithAuth(
      SALESFORCE_TOKEN,
      SALESFORCE_LOGIN_URL,
      SALESFORCE_ORG_ID,
      SALESFORCE_USERNAME
    );

    //subscribe to data change events
    const eventEmitter = await client.subscribe(
      "/data/npe01__OppPayment__ChangeEvent",
      25
    );

    // Handle incoming events
    eventEmitter.on("data", async (event) => {
      console.log(
        `Handling ${event.payload.ChangeEventHeader.entityName} change event ${event.replayId}`
      );
      eventHandler(event);
    });
  } catch (error) {
    console.error(error);
    // if metadata/auth error - submit refresh token for new access token
  }
};

// salesforceController.run();

export default salesforceController;
