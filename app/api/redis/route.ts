// NextRequest object from next server
import { NextRequest, NextResponse } from "next/server";
// import client object to interact with redis and DB connection function from our redis.ts file
import { client, redisConnect } from "../../../lib/redis";
import axios from "axios";
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
			// map to new object sorted  for ease of data access
			// destructure assignment for node object
			const { Id, Invoice__c, Invoice_Sent_Date__c, npe01__Payment_Amount__c, Opportunity_Account_Name__c, Opportunity_18_Digit_ID__c, npe01__Payment_Method__c, npe01__Payment_Date__c, npe01__Scheduled_Date__c } = parsed.node

			const stripeInvoice = await axios.post('http://localhost:3000/api/webhook', { amount: npe01__Payment_Amount__c.value, customer: Opportunity_Account_Name__c.value, due_date: npe01__Scheduled_Date__c.value })

			const cachedInvoices = {
				unique_invoice_id: Id,
				invoice_number: Invoice__c.value,
				invoice_amount: npe01__Payment_Amount__c.value,
				invoice_sent_date: Invoice_Sent_Date__c.value,
				invoice_paid_date: npe01__Payment_Date__c.value,
				invoice_due_date: npe01__Scheduled_Date__c.value,
				payment_method: npe01__Payment_Method__c.value,
				opportunity_unique_id: Opportunity_18_Digit_ID__c.value,
				account_name: Opportunity_Account_Name__c.value,
				stripeInvoice
			}
			console.log("stripeInvoice in redis GET request", stripeInvoice)
			// return sotrted object
			// return ({
			// 	unique_invoice_id: Id,
			// 	invoice_number: Invoice__c.value,
			// 	invoice_amount: npe01__Payment_Amount__c.value,
			// 	invoice_sent_date: Invoice_Sent_Date__c.value,
			// 	invoice_paid_date: npe01__Payment_Date__c.value,
			// 	// invoice_due_date
			// 	payment_method: npe01__Payment_Method__c.value,
			// 	opportunity_unique_id: Opportunity_18_Digit_ID__c.value,
			// 	account_name: Opportunity_Account_Name__c.value,
			// 	stripeInvoice
			// })

			/**
			 * parsed.map(async (element:
				{
					node: {
						Id: string,
						Invoice__c: { value: string },
						Invoice_Sent_Date__c: { value: string },
						npe01__Payment_Amount__c: { value: number },
						Opportunity_Account_Name__c: { value: string },
						Opportunity_18_Digit_ID__c: { value: string },
						npe01__Payment_Method__c: { value: string },
						npe01__Payment_Date__c: { value: string },
						npe01__Scheduled_Date__c: { value: string }
					}
				}) => {

				
			})
			*/
			console.log("cachedInvoices from redis GET request: ", cachedInvoices)

			return new NextResponse(JSON.stringify(cachedInvoices))
		}
		return new NextResponse('Invoice not found');
	}
	catch (err) {
		console.log(err)
		return new NextResponse("Internal Server Error", { status: 500 })
	}
}