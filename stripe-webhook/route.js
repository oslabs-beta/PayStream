
import dotenv from "dotenv"
import {salesforcePaid} from "./stripe_salesforce_fetch.js";
import Stripe from "stripe";
import express from "express";
import bodyparser from "body-parser"

//start stripe session with stripe specific key

dotenv.config()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const app = express();


// create the route that is going to be hit by Stripe when an event takes place
// this will require stripe login and stripe listen --forward-to localhost:4242/webhook into the CLI
// will be temporary until we get our application on a public server

app.post('/webhook', bodyparser.raw({ type: 'application/json' }), async (request, response) => {
    const payload = request.body;
    const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET
    const sig = request.headers['stripe-signature'];
    let event;

    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
      console.log(event.type)
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
  
    // Handle the event
    switch (event.type) {
      case 'invoice.paid':
        const invoicePaid = event.data.object;
        // this is where we would tap into the Salesforce webhook to update an invoice as paid (logic made just need to tie it in)
        salesforcePaid(invoicePaid.id)

        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

app.listen(4242, () => console.log('Running on port 4242'));
