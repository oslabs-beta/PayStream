// NextRequest object from next server
import { NextRequest, NextResponse } from "next/server";

import axios from "axios";

// import client object to interact with redis and DB connection function from our redis.ts file
import { client, redisConnect } from "../../../lib/redis";
import { PaymentProps } from "@/lib/types";

/* 
 * GET request for retrieving invoice data from redis cache
*/
export const POST = async (req: NextRequest): Promise<NextResponse | undefined> => {
	try {
		// await redisConnect() //open redis connection on hot reload
		/**
		 * retrieve cached invoice records from redisDB passed as params on axios request - need to access from nextreq obj
		 */
		// console.log(req)
		const request = await req.json()
		console.log(request)
		const account_name: string = JSON.stringify(request.account_name);

		const cachedInvoices = await client.SMEMBERS(account_name)
		console.log(cachedInvoices)
		// type check for if what returns from client.get is a string to account for potential null
		if (Array.isArray(cachedInvoices)) {

			// parse string
			// const parsed = JSON.parse(cachedInvoicesParse)

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