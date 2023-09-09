import Stripe from "stripe";
import { NextResponse } from "next/server";

//create invoice. Will be ran when something from salesforce is recieved

export async function POST(request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const customerList = await stripe.customers.list();
  let customerId;
  customerList.data.forEach((element) => {
    if (element.object === request.customer) {
      customerId = element.id;
      return;
    }
  });
  if (!customerId) {
    // Create a new Customer
    const customer = await stripe.customers.create({
      object: request.customer,
      description: "Customer to invoice",
    });
    // Store the Customer ID in your database to use for future purchases
    CUSTOMERS.push({ stripeId: customer.id, email: email });
    customerId = customer.id;
  } else {
    // Read the Customer ID from your database
    customerId = customer.stripeId;
  }

  // const cost = request.amount * 100;
  const newInvoice = await stripe.invoices.create({
    customer: request.customer,
    auto_advance: false,
    collection_method: "send_invoice",
    // amount: request.amount * 100,
    due_date: request.due_date,
  });

  console.log("new stripe invoice created in webhook route: ", newInvoice);

  await stripe.invoiceItems.create({
    customer: request.customer,
    price: request.amount * 100,
    invoice: newInvoice.data.id,
  });

  const finalInvoice = await stripe.invoices.finalizeInvoice(newInvoice.id);

  console.log("final tripe invoice created in webhook route: ", finalInvoice);

  return NextResponse.json(finalInvoice.data);
  // return;
}
