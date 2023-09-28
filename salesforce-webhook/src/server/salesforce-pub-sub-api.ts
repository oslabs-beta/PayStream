import PubSubApiClient from "salesforce-pubsub-api-client";
import dotenv from "dotenv";
dotenv.config()
// require("dotenv").config

const {
	SALESFORCE_LOGIN_URL,
	SALESFORCE_TOKEN,
	SALESFORCE_USERNAME,
	SALESFORCE_ORG_ID,
} = process.env;

const accessToken =
	"Bearer 00DEi000000QlCz!AQEAQO60ydwSyvboeWsKFt53pGpPHrMzCOTxHu0h0w8Yived3FvlVds91MfzWgF5Ldl0jZ3NXbIb1UqzFa4iUvbrBGJ0zQg3";
const instanceUrl = "https://escsocal--lc001.sandbox.my.salesforce.com";
const organizationId = "00DEi000000QlCz";
const username = "admin@escsc.org";

const salesforceController: any = {};

salesforceController.run = async () => {
	try {
		// console.log(process.env.SALESFORCE_LOGIN_URL);
		console.log("instanceUrl: ", SALESFORCE_LOGIN_URL);
		const client = new PubSubApiClient();
		await client.connectWithAuth(
			SALESFORCE_TOKEN!,
			SALESFORCE_LOGIN_URL!,
			SALESFORCE_ORG_ID!,
			SALESFORCE_USERNAME!
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
		eventEmitter.on("data", (event: any) => {
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
