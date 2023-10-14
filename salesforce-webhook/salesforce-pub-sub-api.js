import PubSubApiClient from "salesforce-pubsub-api-client";
import dotenv from "dotenv";
import {
  retreiveOppType,
  createStripeInvoice,
  updateSalesforceStripeId,
} from "./fetchSalesforceAPI.js";
// import { getOppRecordType } from "./controller";
dotenv.config();
// require("dotenv").config

const {
  SALESFORCE_LOGIN_URL,
  SALESFORCE_TOKEN,
  SALESFORCE_USERNAME,
  SALESFORCE_ORG_ID,
} = process.env;

// List of opportunity record types from SAlesforce, would like to find a way to have this sent to the app, not manually updated
const recordTypes = [
  "SP",
  "BD",
  "FD",
  "LC",
  "RF",
  "OD",
  "FOC",
  "OA",
  "CA",
  "HR",
  "Customized",
  "SM",
  "CC",
  "EDLI",
  "DDP",
];

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
    eventEmitter.on("data", async (event) => {
      console.log(
        `Handling ${event.payload.ChangeEventHeader.entityName} change event ${event.replayId}`
      );
      // console.log(event, null, 2);
      // console.log(
      //   "changed fields: ",
      //   event.payload.ChangeEventHeader.changedFields
      // );

      // initialize variable to payment record ID
      if (event.payload.ChangeEventHeader.changeType !== "DELETE") {
        // initialize oppType variable to the evaluated result of retrieveOppType function passing in recordId
        const recordId = event.payload.ChangeEventHeader.recordIds[0];
        const opportunity = await retreiveOppType(recordId);

        // if the opp type that corresponds to the updated payment record is in our record types array AND the payment type is cost to client; the switch statement should run
        if (recordTypes.includes(opportunity.type)) {
          /**
           * switch statement to handle cases based on "changeType" of event
           */
          switch (event.payload.ChangeEventHeader.changeType) {
            /**
             *  if changeType is "create" need to create object for stripe invoice details:
             * customer name
             * customer email
             * payment invoice number
             * payment amount
             *
             * creates invoice in stripe
             */
            case "CREATE": {
              console.log(
                "CREATE case changeType: ",
                event.payload.ChangeEventHeader.changeType
              );
              //save the opportunity Id record for easier querying
              const paymentType = event.payload.For_Chart__c;
              const paymentAmount = event.payload.npe01__Payment_Amount__c;
              const invoice_number = event.payload.Name;
              console.log("payment amount: ", paymentAmount.double);
              console.log("payment type: ", paymentType.string);
              // console.log("CREATE id: ", oppType);
              if (paymentType.string === "Cost to Client") {
                const paymentDetails = {
                  account_name: opportunity.account_name,
                  amount: paymentAmount.double,
                  project_type: opportunity.project_type,
                  invoice_number: invoice_number.string,
                };
                //create invoice in stripe
                const stripeInvoice = await createStripeInvoice(paymentDetails);

                //update salesforce record with stripe invoice id
                await updateSalesforceStripeId(recordId, stripeInvoice.id);
              }

              break;
            }
            /**
             * if changeType is "update" /**
             * use changed fields to identify which properties to data capture and then find relevant invoice in stripe to update
             */
            case "UPDATE": {
              //currently updating with stripe id is added, will need to make an array of changes that are acceptable and want to do
              console.log(
                "UPDATE case changeType: ",
                event.payload.ChangeEventHeader.changeType
              );
              // only have invoice record id
              break;
            }
            default: {
              console.log("default case hit: ", JSON.stringify(event, null, 2));
            }
          }
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
