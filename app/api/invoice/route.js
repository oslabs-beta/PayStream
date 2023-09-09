import Stripe from "stripe";
import { NextResponse } from "next/server";

// export async function GET(request) {
//     const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
//     const invoices = await stripe.invoices.list({
//         limit: 1
//     });

//     return NextResponse.json(invoices.data)
// }

// get invoice data once link is clicked (unsure at the moment what data is sent along with link)

export async function POST(request) {


    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    //const invoiceId = await request.json();
    const invoiceId = "in_1NlzoQHT7cVdV2e0To8zJ080"
    const invoice = await stripe.invoices.retrieve(invoiceId);
    console.log('invoice info from getting invoice data is: ', invoice)

    return NextResponse.json(invoice)
}

