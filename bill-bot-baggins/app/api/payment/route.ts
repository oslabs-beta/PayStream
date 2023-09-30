import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

const config: Stripe.StripeConfig = {
	apiVersion: "2023-08-16",
	typescript: true,
}

export async function POST(req: NextRequest): Promise<NextResponse> {
	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, config);
	let data = await req.json()
	let invoice = data.invoice
	console.log('data sent to checkout session is: ', invoice)

	// const data = {clientSecret: paymentIntent.client_secret,}
	const session = await stripe.checkout.sessions.create({
		line_items: [
			{
				price_data: {
					currency: 'usd',
					unit_amount: invoice.amount_due,
					product_data: {
						// name: invoice.id
						name: `Invoice ${invoice.id}`
					}
				},
				quantity: 1,
			}
		],
		mode: 'payment',
		// customer: id add customer ID for easier checkout for returning customer
		// invoice_creation: true,
		success_url: 'http://localhost:3000/success/', //redirect link should pass invoice number as url parameter to sucessfully paid invoice with button to download page
		cancel_url: 'http://localhost:3000' // redirect to homepage when cancelled

	})
	return NextResponse.json(session.url)

};