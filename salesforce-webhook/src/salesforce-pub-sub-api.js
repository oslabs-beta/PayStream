import PubSubApiClient from "salesforce-pubsub-api-client";
import dotenv from "dotenv";
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
     * need to check if the event is an a consulting engagement or insitute opportunity
     * identify change fields
     * if it matches this criteria, it should create a an invoice in stripe
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
      console.log("payment type: ", JSON.stringify(event.payload.For_Chart__c));
      console.log(
        "payment amount: ",
        JSON.stringify(event.payload.npe01__Payment_Amount__c)
      );
      /**
       * switch statement to handle cases based on "changeType" of event
       */
      switch (event.payload.ChangeEventHeader.changeType) {
        /**
         *  if changeType is "create" need to store all collected fields amount, invoice due date, name/invoice number, opportunity id,
         */
        case "CREATE": {
          console.log(
            "CREATE case changeType: ",
            event.payload.ChangeEventHeader.changeType
          );
          break;
        }
        /**
         * if changeType is "update" /**
         * use changed fields to identify which properties to data capture and then find relevant invoice in stripe to update
         */
        case "UPDATE": {
          console.log(
            "UPDATE case changeType: ",
            event.payload.ChangeEventHeader.changeType
          );
          break;
        }
        case "DELETE": {
          console.log(
            "DELETE case changeType: ",
            event.payload.ChangeEventHeader.changeType
          );
          break;
        }
        default: {
          console.log("default case hit: ", JSON.stringify(event, null, 2));
        }
      }
    });
  } catch (error) {
    console.error(error);
    // if metadata/auth error - submit refresh token for new access token
  }
};

// salesforceController.run();

export default salesforceController;