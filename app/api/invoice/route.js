import Stripe from "stripe";
import { NextResponse } from "next/server";

// export async function GET(request) {
//     const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
//     const invoices = await stripe.invoices.list({
//         limit: 1
//     });

//     console.log(invoices.data[0]);

//     return NextResponse.json(invoices.data[0])
// }

// get invoice data once link is clicked (unsure at the moment what data is sent along with link)

export async function POST(request) {
    const res = await request.json()
    
    const { invoiceId } = res
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    //const invoiceId = await request.json();
    // const invoiceId = "in_1NlzoQHT7cVdV2e0To8zJ080"
    const invoice = await stripe.invoices.retrieve(invoiceId);
    // console.log('invoice info from getting invoice data is: ', invoice)

    const data = {
        id: invoice.id,
        account_name: invoice.account_name,
        amount_due: invoice.amount_due,
        amount_paid: invoice.amount_paid,
        amount_remaining: invoice.amount_remaining,
        customer: invoice.customer,
        customer_email: invoice.customer_email,
        customer_name: invoice.customer_name,
        due_date: invoice.due_date
    }

    return NextResponse.json(data)
}

