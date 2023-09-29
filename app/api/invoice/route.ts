import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

// export async function GET(request) {
//     const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
//     const invoices = await stripe.invoices.list({
//         limit: 1
//     });

//     return NextResponse.json(invoices.data)
// }

// get invoice data once link is clicked (unsure at the moment what data is sent along with link)
const config: Stripe.StripeConfig = {
	apiVersion: "2023-08-16",
	typescript: true,
}

export async function POST(req: NextRequest): Promise<NextResponse> {

	const { invoiceId }: { invoiceId: string } = await req.json()

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, config);
	//const invoiceId = await request.json();
	/**
	 * want the invoice ID to come from salesforce data OR req params
	 * currently, hard coded to reference existing ID
	 */
	// The invoiceId from the req should be the ID in the URL sent to the client
	const invoice = await stripe.invoices.retrieve(invoiceId);
	// console.log('invoice info from getting invoice data is: ', invoice)

	return NextResponse.json(invoice)
}

