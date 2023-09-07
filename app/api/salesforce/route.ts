import { NextRequest, NextResponse } from "next/server";
import { redisConnect, client } from "@/lib/redis";

// use graphQL to manage api calls to Salesforce
const axios = require('axios');

// need to code way to refresh / generate new token when expired - do not need for MVP
const { SF_COOKIE_AUTH, SF_AUTH, SF_SANDBOX_URL } = process.env

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
	query: `query accounts {
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
	url: SF_SANDBOX_URL,
	headers: {
		'X-Chatter-Entity-Encoding': 'false',
		'Content-Type': 'application/json',
		'Authorization': SF_AUTH,
		'Cookie': SF_COOKIE_AUTH,
	},
	data: data
};


// POST function gets data from salesforce and caches to redis, all subsequent calls are from redis
export const POST = async (req: NextRequest): Promise<NextResponse | undefined> => {
	try {
		const data = await axios.request(config);
		const paymentInfo = data.data.data.uiapi.query.npe01__OppPayment__c.edges[0];
		await redisConnect() //open redis connection on hot reload
		console.log("paymentInfo: ", paymentInfo)
		const invoiceNumber: string | null = JSON.stringify(paymentInfo.node.Invoice__c.value)
		const invoiceDetails: string | null = JSON.stringify(paymentInfo)
		/* 
		add each invoice to a unique key-value pair
		key should be invoice number
		value should be all other invoice data
		*/
		await client.set(invoiceNumber, invoiceDetails)
		console.log("invoices: ", await client.get(invoiceNumber))

		return new NextResponse(invoiceNumber)
	}
	catch (err) {
		console.log(err)
		return new NextResponse("Internal Server Error", { status: 500 })
	}
}
