import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';

//create invoice. Will be ran when something from salesforce is recieved

export async function POST(NextRequest) {
  const req = await NextRequest.json();

  console.log('REQUEST object in webhook route: ', req);

  /**
   * open stripe connection
   */
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  /**
   * retrieve customer list from stripe
   */
  const customerList = await stripe.customers.list();
  let customerId;
  customerList.data.forEach((element) => {
    if (element.name === req.customer) {
      customerId = element.id;
      return;
    }
  });

  /**
   * if account is not in stripe yet, create account and retrieve the customer id to send the invoice to
   * requires an email address to set up
   * will need to pass email from Salesforce - set-up route to connect that
   */
  if (!customerId) {
    // Create a new Customer
    console.log('req.customer: ', req.customer);
    const customer = await stripe.customers.create({
      name: req.customer,
      email: 'lcchrty@gmail.com',
    });

    customerId = customer.id;
  }

  /**
   * create new invoice in stripe based on invoice information from salesforce
   */
  const newInvoice = await stripe.invoices.create({
    customer: customerId,
    auto_advance: false,
    collection_method: 'send_invoice',
    // amount: request.amount * 100,
    days_until_due: 30,
  });

  console.log('new stripe invoice created in webhook route: ', newInvoice);

  /**
   * need project type from salesforce/redis/props to create the "product type" and then assign a deafult price
   */
  const product = await stripe.products.create({
    name: req.invoice_number,
    default_price_data: {
      currency: 'usd',
      unit_amount: req.amount,
    },
  });

  /**
   * add line item to invoice just created
   */
  await stripe.invoiceItems.create({
    customer: customerId,
    price: product.default_price,
    invoice: newInvoice.id,
  });

  /**
   * retrieve final invoice from strip
   * */
  const finalInvoice = await stripe.invoices.finalizeInvoice(newInvoice.id);

  console.log(
    'final stripe invoice created in stripe route: ',
    finalInvoice.id
  );

  return new NextResponse(finalInvoice.id);
  // return;
}
