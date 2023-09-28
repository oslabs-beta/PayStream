import { NextRequest, NextResponse } from "next/server";
/**
 * we shouldn't need to open the redis connection in production - the socket closes everytiem the this app's code recompiles (on hot reload)
 */
import { redisConnect, client } from "@/lib/redis";
import { PaymentProps } from "@/lib/types";

// use graphQL to manage api calls to Salesforce
const axios = require('axios');

// need to code way to refresh / generate new token when expired - do not need for MVP
const { SALESFORCE_LOGIN_URI, SALESFORCE_CLIENT_ID, SALESFORCE_CLIENT_SECRET, SALESFORCE_COOKIE_AUTH, SALESFORCE_TOKEN, SALESFORCE_GRAPHQL_URI } = process.env

// let sfConfig = {
// 	url: SALESFORCE_LOGIN_URI,
// 	method: 'post',
// 	// maxBodyLength: Infinity,
// 	headers: {
// 		grant_type: 'refresh_token',
// 		client_id: SALESFORCE_CLIENT_ID,
// 		client_secret: SALESFORCE_CLIENT_SECRET,
// 		refresh_token: SALESFORCE_TOKEN
// 	},
// };

/*
overview of API field names and what they reference
Opportunity_18_Digit_ID__c: 18 character unique ID
 npe01__Opportunity__c: references opportunity by name from the payment record
ID: unique reference id for the object
Invoice_Sent_Date__c: date sent
Invoice__c: Invoice number
Opportunity_Account_Name__c: account name of the opportunity (project) the payment is for
npe01__Payment_Amount__c: amount on invoice
npe01__Payment_Date__c: date invoice paid
npe01__Payment_Method__c: method of payment (cc, check, etc.)
*/

let data = JSON.stringify({
	query: `query payments {
  uiapi {
    query {
      npe01__OppPayment__c {
        edges {
          node {
            Id
            Invoice__c {
                value
            }
            Invoice_Sent_Date__c {
                value
            }
            npe01__Payment_Amount__c {
                value
            }
            Opportunity_Account_Name__c {
                value
            }
            Opportunity_18_Digit_ID__c {
                value
            }
            npe01__Payment_Method__c {
                value
            }
            npe01__Payment_Date__c {
                value
            }
            npe01__Scheduled_Date__c{
							value
						}
          }
        }
      }
    }
  }
}`,
	variables: {}
});

// need to see how authorization headers gt refreshed to confirm access
// need to move all credential headers to .env
let config = {
	method: 'post',
	maxBodyLength: Infinity,
	url: SALESFORCE_GRAPHQL_URI,
	headers: {
		'X-Chatter-Entity-Encoding': 'false',
		'Content-Type': 'application/json',
		'Authorization': SALESFORCE_TOKEN,
		'Cookie': SALESFORCE_COOKIE_AUTH,
	},
	data: data
};


// POST function gets data from salesforce and caches to redis, all subsequent calls are from redis

export const POST = async (req: NextRequest): Promise<NextResponse | undefined> => {
	try {

		// refresh salesfroce token
		// const sf_refresh_token = await axios.request(sfConfig)
		// console.log(sf_refresh_token)

		const data = await axios.request(config);
		// retrieve all invoice information from salesforce graphql call
		const paymentInfo = data.data.data.uiapi.query.npe01__OppPayment__c.edges[0];

		console.log("payment info: ", paymentInfo.node)
		// destructure assignment for node object
		const { Id, Invoice__c, Invoice_Sent_Date__c, npe01__Payment_Amount__c, Opportunity_Account_Name__c, Opportunity_18_Digit_ID__c, npe01__Payment_Method__c, npe01__Payment_Date__c, npe01__Scheduled_Date__c } = paymentInfo.node
		/**
		 * fetch stripe invoice ID to store on object stored in redis
		 */
		const stripeInvoiceId = await axios.request({
			url: "http://localhost:3000/api/stripe",
			method: 'post',
			data: {
				amount: npe01__Payment_Amount__c.value,
				customer: Opportunity_Account_Name__c.value,
				due_date: npe01__Scheduled_Date__c.value,
				invoice_number: Invoice__c.value
			}
		})

		/**
		 * sending stripe invoice id to salesforce record
		 */
		let sfdata: any = JSON.stringify({
			"allowSaveOnDuplicate": false,
			"fields": {
				"npe01__Paid__c": false,
				"Stripe_Invoice_ID__c": stripeInvoiceId.data
			}
		});

		let sfconfig: any = {
			method: 'patch',
			maxBodyLength: Infinity,
			url: 'https://escsocal--lc001.sandbox.my.salesforce.com/services/data/v58.0/ui-api/records/a01Ei0000067fuEIAQ',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': SALESFORCE_TOKEN,
				'Cookie': SALESFORCE_COOKIE_AUTH
			},
			data: sfdata
		};

		axios.request(sfconfig)
			.then((response: any) => {
				console.log(JSON.stringify(response.data));
			})
			.catch((error: any) => {
				console.log(error);
			});

		const cachedInvoices: PaymentProps = {
			sf_unique_id: Id,
			invoice_id: Invoice__c.value,
			amount: npe01__Payment_Amount__c.value,
			invoice_sent_date: Invoice_Sent_Date__c.value,
			payment_date: npe01__Payment_Date__c.value,
			invoice_due_date: npe01__Scheduled_Date__c.value,
			payment_method: npe01__Payment_Method__c.value,
			project_name: Opportunity_18_Digit_ID__c.value,
			account_name: Opportunity_Account_Name__c.value,
			stripe_invoice_id: stripeInvoiceId.data,
		}



		// await redisConnect() //open redis connection on hot reload

		// console.log("invoice details to store in redis POST request: ", cachedInvoices);
		const account_name: string | null = JSON.stringify(Opportunity_Account_Name__c.value);
		const invoiceDetails: string | null = JSON.stringify(cachedInvoices);

		/**
		 * add each salesforce invoice to the redis cache at the key for the organization
		 * key: acount_name variable (client org)
		 * value: Set that stores list of invoice details - if the invoice is already there, no duplicates
		 * if the org doesn't exist, it will create duplicates
		 */

		// await client.SADD(account_name, invoiceDetails)
		// console.log("invoice stored in redis from salesforce POST request: ", await client.SMEMBERS(account_name))

		return NextResponse.json(cachedInvoices)
	}
	catch (err) {
		console.log(err)
		return new NextResponse("Internal Server Error", { status: 500 })
	}
}
