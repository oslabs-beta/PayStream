import axios from "axios";
import Stripe from "stripe";
// import { PaymentDetails } from "./type";

export const getPaymentType = async (id) => {
  let clientPayment = false;
  let data = JSON.stringify({
    query: `query payments ($Id: ID) {
		uiapi {
			query {
				npe01__OppPayment__c (where: { Id: { eq: $Id } }) {
					edges {
						node {
							For_Chart__c {
									value
							}
						}
					}
				}
			}
		}
	}`,
    variables: { Id: id },
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://escsocal--lc001.sandbox.my.salesforce.com/services/data/v58.0/graphql",
    headers: {
      "X-Chatter-Entity-Encoding": "false",
      "Content-Type": "application/json",
      Authorization: process.env.SALESFORCE_TOKEN,
      Cookie: process.env.SALESFORCE_COOKIE_AUTH,
    },
    data: data,
  };
  const fetchPaymentType = await axios.request(config);
  const paymentType =
    fetchPaymentType.data.data.uiapi.query.npe01__OppPayment__c.edges[0].node
      .For_Chart__c.value;
  if (paymentType === "Cost to Client") clientPayment = true;
  return clientPayment;
};

/**
 * helper function - graphQL api call to salesforce for opportunity record ID
 * @param string - payment record id from data change capture event
 * @return string - opportunity record id
 */
export const getOppRecordId = async (id) => {
  let data = JSON.stringify({
    query: `query payments ($Id: ID) {
		uiapi {
			query {
				npe01__OppPayment__c (where: { Id: { eq: $Id } }) {
					edges {
						node {
							Id
							Opportunity_Account_Name__c {
									value
							}
							npe01__Opportunity__c {
									value
							}
						}
					}
				}
			}
		}
	}`,
    variables: { Id: id },
  });
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://escsocal--lc001.sandbox.my.salesforce.com/services/data/v58.0/graphql",
    headers: {
      "X-Chatter-Entity-Encoding": "false",
      "Content-Type": "application/json",
      Authorization: process.env.SALESFORCE_TOKEN,
      Cookie: process.env.SALESFORCE_COOKIE_AUTH,
    },
    data: data,
  };

  const fetchOppId = await axios.request(config);
  const oppId =
    fetchOppId.data.data.uiapi.query.npe01__OppPayment__c.edges[0].node
      .npe01__Opportunity__c.value;

  return oppId;
};

/**
 * graphQL salesforce API call to retrive opportunity record type for payment record captured in data change event
 * @param {*} id
 * @returns object with opportunty type abbreviation, type - long form, and account name properties
 */

export const retreiveOppType = async (id) => {
  const fetchOppId = await getOppRecordId(id);

  let data = JSON.stringify({
    query: `query payments ($Id: ID) {
		uiapi {
			query {
				Opportunity (where: { Id: { eq: $Id } }) {
					edges {
						node {
							Id
							Name {
									value
							}
							Type {
									value
							}
							FOR_CONGA_Engagement_Type__c {
                value
            }
						Account {
							Name {
									value
							}
					}
						}
					}
				}
			}
		}
	}`,
    variables: { Id: fetchOppId },
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://escsocal--lc001.sandbox.my.salesforce.com/services/data/v58.0/graphql",
    headers: {
      "X-Chatter-Entity-Encoding": "false",
      "Content-Type": "application/json",
      Authorization: process.env.SALESFORCE_TOKEN,
      Cookie: process.env.SALESFORCE_COOKIE_AUTH,
    },
    data: data,
  };

  const fetchOppType = await axios.request(config);
  const {
    Id,
    Type,
    npsp__Primary_Contact__c,
    FOR_CONGA_Engagement_Type__c,
    Account,
  } = fetchOppType.data.data.uiapi.query.Opportunity.edges[0].node;
  const opportunity = {
    type: Type.value,
    project_type: FOR_CONGA_Engagement_Type__c.value,
    // primary_contact_id: npsp__Primary_Contact__c.value,
    account_name: Account.Name.value,
    sf_opp_id: Id,
  };
  return opportunity;
};

/**
 * creates invoice in Stripe to match payment record received from salesforce
 * @param Object - data needed to create stripe invoice
 * @return stripe invoice ID
 */
export const createStripeInvoice = async (paymentInfo) => {
  const config = {
    apiVersion: "2023-08-16",
    typescript: true,
  };
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, config);

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
    // amount: request.amount * 100,
    days_until_due: 30,
  });

  console.log("new stripe invoice created in webhook route: ", newInvoice);

  /**
   * need project type from salesforce (passed in on arg object) to create the "product type" and then assign a default price (also on passed in object)
   */
  const product = await stripe.products.create({
    name: (paymentInfo.invoice_number, paymentInfo.project_type),
    default_price_data: {
      currency: "usd",
      unit_amount: paymentInfo.amount,
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

export const updateSalesforceStripeId = async (recordId, stripeinvoiceId) => {
  let data = JSON.stringify({
    allowSaveOnDuplicate: false,
    fields: {
      Stripe_Invoice_ID__c: stripeinvoiceId,
    },
  });

  let config = {
    method: "patch",
    maxBodyLength: Infinity,
    url: `https://escsocal--lc001.sandbox.my.salesforce.com/services/data/v58.0/ui-api/records/${recordId}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.SALESFORCE_TOKEN,
      Cookie: process.env.SALESFORCE_COOKIE_AUTH,
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};
