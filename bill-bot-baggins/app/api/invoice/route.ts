import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";


// added typescript option to the stripe config so we have types for the stripe objects (RH)
const config: Stripe.StripeConfig = {
	apiVersion: "2023-08-16",
	typescript: true,
}

// this was necessary for typescript issue I was having (RH)
type JwtPayload = {
	invoiceId: string
}

// Changed this to a GET request (RH)
export async function GET(req: NextRequest) {
	try {
		const { STRIPE_SECRET_KEY } = process.env
		const token = req.nextUrl.searchParams.get("token"); // now a GET request so need this to get the invoiceId
		
		// check if there is a token in the search params
		if (token) {
			// verify the JWT
			const decoded = jwt.verify(token, process.env.SECRET_API_KEY) as JwtPayload;
			const stripe = new Stripe(STRIPE_SECRET_KEY, config);

		    // The invoiceId from the req searchParams should be the ID in the URL sent to the client
		    const invoice = await stripe.invoices.retrieve(decoded.invoiceId);
			console.log("In the API invoice route ", invoice)
			return NextResponse.json(invoice)
		}

		return NextResponse.json({ error: "Not authorized"}, { status: 401 });
	} catch (err) {
	  return NextResponse.json({ error: err }, { status: 500 });
	}
	
}

