import axios from "axios";
import Stripe from "stripe";
// import { PaymentDetails } from "./type";

const config = {
  apiVersion: "2023-08-16",
  typescript: true,
};
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, config);

const stripeRouter = {};
/**
 * creates invoice in Stripe to match payment record received from salesforce
 * @param Object - data needed to create stripe invoice
 * @return stripe invoice ID
 */
stripeRouter.createStripeInvoice = async (paymentInfo) => {
  /**
   * retrieve customer list from stripe
   */
  const customerList = await stripe.customers.list();
  let customerId;
  customerList.data.forEach((element) => {
    if (element.name === paymentInfo.account_name) {
      customerId = element.id;
      return;
    }
  });

  /**
   * if account is not in stripe yet, create account and retrieve the customer id to send the invoice to
   * all invoices will be created with an ESCSC.org billing email for now - wil not send emails to clients from Stripe
   */
  if (!customerId) {
    // Create a new Customer
    console.log("payment deets.account_name ", paymentInfo.account_name);
    const customer = await stripe.customers.create({
      name: paymentInfo.account_name,
      email: "lcharity@escsc.org",
    });

    customerId = customer.id;
  }

  /**
   * create new invoice in stripe based on invoice information from salesforce (on paymentInfo arg)
   */
  const newInvoice = await stripe.invoices.create({
    customer: customerId,
    auto_advance: false,
    collection_method: "send_invoice",
    days_until_due: 30,
  });

  console.log("new stripe invoice created in webhook route: ", newInvoice);

  /**
   * need project type from salesforce (passed in on arg object) to create the "product type" and then assign a default price (also on passed in object)
   */
  const product = await stripe.products.create({
    name: `${paymentInfo.project_type} Project Invoice #: ${paymentInfo.invoice_number} `,
    default_price_data: {
      currency: "usd",
      unit_amount: paymentInfo.amount * 100,
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
   * retrieve final invoice from stripe
   * */
  const finalInvoice = await stripe.invoices.finalizeInvoice(newInvoice.id);
  return finalInvoice;
};

/** look up invoice in stripe to see if exists */

/**update invoice in stripe */
stripeRouter.updatePaidStripeInvoice = async (payload) => {};

export default stripeRouter;
