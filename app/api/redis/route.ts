// NextRequest object from next server
import { NextRequest, NextResponse } from "next/server";
// import client object to interact with redis and DB connection function from our redis.ts file
import { client, redisConnect } from "../../../lib/redis";

// hard-coded post request for adding information to redis
// export const POST = async (req: NextRequest): Promise<NextResponse | undefined> => {
// 	try {
// 		// need to implement handling to identify if the socket is open; this works for hot reload, but will need to be stable when in production
// 		await redisConnect() //open redis connection on hot reload

// 		// want to retrieve salesforce daya to send as body of req 
// 		const body = await req.json()
// 		console.log(body)
// 		const { sfInvoiceData } = body


// 		// add salesforce data to redis cache | need to update "invoices"
// 		await client.set("invoices", JSON.stringify(sfInvoiceData))

// 		// retrieve cached invoices and send to the front end in a readable manner
// 		const cachedInvoicesParse = await client.get("invoices")
// 		if (typeof cachedInvoicesParse === 'string') {
// 			const parsed = JSON.parse(cachedInvoicesParse);
// 			const cachedInvoices = parsed.map((element:
// 				{
// 					node: {
// 						Id: string,
// 						Invoice__c: { value: string },
// 						Invoice_Sent_Date__c: { value: string },
// 						npe01__Payment_Amount__c: { value: number },
// 						Opportunity_Account_Name__c: { value: string },
// 						Opportunity_18_Digit_ID__c: { value: string },
// 						npe01__Payment_Method__c: { value: string },
// 						npe01__Payment_Date__c: { value: string }
// 					}
// 				}) => {
// 				const { Id, Invoice__c, Invoice_Sent_Date__c, npe01__Payment_Amount__c, Opportunity_Account_Name__c, Opportunity_18_Digit_ID__c, npe01__Payment_Method__c, npe01__Payment_Date__c } = element.node
// 				return ({
// 					unique_invoice_id: Id,
// 					invoice_number: Invoice__c.value,
// 					invoice_amount: npe01__Payment_Amount__c.value,
// 					invoice_sent_date: Invoice_Sent_Date__c.value,
// 					invoice_paid_date: npe01__Payment_Date__c.value,
// 					payment_method: npe01__Payment_Method__c.value,
// 					opportunity_unique_id: Opportunity_18_Digit_ID__c.value,
// 					account_name: Opportunity_Account_Name__c.value
// 				})
// 			})
// 			console.log("cachedInvoices", cachedInvoices)
// 			return new NextResponse(JSON.stringify(cachedInvoices))
// 		}



// 		// console.log("redis test set", await client.SMEMBERS(`tags:${newInfoId}`))

// 		return new NextResponse('No new invoices to report');
// 	}
// 	catch (err) {
// 		console.log(err)
// 		return new NextResponse("Internal Server Error", { status: 500 })
// 	}
// }


// get request for retrieving data from redis cache
export const GET = async (req: NextRequest): Promise<NextResponse | undefined> => {
	try {
		await redisConnect() //open redis connection on hot reload

		// retrieve caches invoice reqords from redisDB
		const cachedInvoicesParse = await client.get("newest invoices")

		// type check for if what returns from client.get is a string to account for potential null
		if (typeof cachedInvoicesParse === 'string') {
			// parse string
			const parsed = JSON.parse(cachedInvoicesParse);
			// map to new object sorted  for ease pof data access
			const cachedInvoices = parsed.map((element:
				{
					node: {
						Id: string,
						Invoice__c: { value: string },
						Invoice_Sent_Date__c: { value: string },
						npe01__Payment_Amount__c: { value: number },
						Opportunity_Account_Name__c: { value: string },
						Opportunity_18_Digit_ID__c: { value: string },
						npe01__Payment_Method__c: { value: string },
						npe01__Payment_Date__c: { value: string }
					}
				}) => {
				// destructure assignment for node object
				const { Id, Invoice__c, Invoice_Sent_Date__c, npe01__Payment_Amount__c, Opportunity_Account_Name__c, Opportunity_18_Digit_ID__c, npe01__Payment_Method__c, npe01__Payment_Date__c } = element.node
				// return sotrted object
				return ({
					unique_invoice_id: Id,
					invoice_number: Invoice__c.value,
					invoice_amount: npe01__Payment_Amount__c.value,
					invoice_sent_date: Invoice_Sent_Date__c.value,
					invoice_paid_date: npe01__Payment_Date__c.value,
					payment_method: npe01__Payment_Method__c.value,
					opportunity_unique_id: Opportunity_18_Digit_ID__c.value,
					account_name: Opportunity_Account_Name__c.value
				})
			})
			console.log("cachedInvoices", cachedInvoices)
			return new NextResponse(JSON.stringify(cachedInvoices))
		}
		return new NextResponse('No new invoices to report');
	}
	catch (err) {
		console.log(err)
		return new NextResponse("Internal Server Error", { status: 500 })
	}
}