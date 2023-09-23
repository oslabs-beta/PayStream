import Stripe from "stripe";
import { NextResponse } from "next/server";

//create invoice. Will be ran when something from salesforce is recieved

export async function POST(request) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const cost = request.amount * 100;
    const newInvoice = await stripe.invoices.create({
        //id: try to put the salesforce ID in here
        customer: request.customer,
        auto_advance: false,
        collection_method: "send_invoice",
        amount_due: cost,
    });

    const finalInvoice = await stripe.invoices.finalizeInvoice(newInvoice.id)

    // return NextResponse.json(finalInvoice.data)
    return
}