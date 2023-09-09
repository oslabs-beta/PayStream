// NextRequest object from next server
import { NextRequest, NextResponse } from "next/server";
// import client object to interact with redis and DB connection function from our redis.ts file
import { client, redisConnect } from "../../../lib/redis";
import axios from "axios";
import { PaymentProps } from "@/types";

/* 
 * GET request for retrieving invoice data from redis cache
*/
export const GET = async (req: NextRequest): Promise<NextResponse | undefined> => {
	try {
		await redisConnect() //open redis connection on hot reload
		/**
		 * retrieve cached invoice records from redisDB passed as params on axios request - need to access from nextreq obj
		 */
		// const { invoice } = req.params;
		const cachedInvoicesParse = await client.get("11585")
		console.log(cachedInvoicesParse)
		// type check for if what returns from client.get is a string to account for potential null
		if (typeof cachedInvoicesParse === 'string') {

			// parse string
			const parsed = JSON.parse(cachedInvoicesParse);

			// destructure assignment for node object
			const { Id, Invoice__c, Invoice_Sent_Date__c, npe01__Payment_Amount__c, Opportunity_Account_Name__c, Opportunity_18_Digit_ID__c, npe01__Payment_Method__c, npe01__Payment_Date__c, npe01__Scheduled_Date__c } = parsed.node

			/**
			 * fetch stripe invoice ID to store on object returned from redis
			 * may need to move this to salesforce routes to create the invoice when get the update from salesforce and then store in redis cache
			 */
			const stripeInvoiceId = await axios.request({
				url: "http://localhost:3000/api/webhook",
				method: 'post',
				data: {
					amount: npe01__Payment_Amount__c.value,
					customer: Opportunity_Account_Name__c.value,
					due_date: npe01__Scheduled_Date__c.value
				}
			})

			/**
			 * create object from redis response to align props with paymentProps properties
			 * replace expected type with payment props after merging dev
			 */

			const cachedInvoices: PaymentProps = {
				sf_unique_id: Id.value,
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

			// console.log("stripeInvoiceId in redis GET request", stripeInvoiceId)
			// console.log("cachedInvoices from redis GET request: ", cachedInvoices)

			return NextResponse.json(cachedInvoices)
		}
		// if invoice doesn't exist
		return new NextResponse('Invoice not found');
	}
	catch (err) {
		console.log(err)
		return new NextResponse("Internal Server Error", { status: 500 })
	}
}