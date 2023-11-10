const axios = require("axios");

// import * as sfToken
require("dotenv").config();
const { getToken } = require("sf-jwt-token");

const getSalesForceAccessToken = async () => {
  // convert the base64 private key into a string
  const {
    BASE64_PRIVATE_KEY,
    SALESFORCE_CLIENT_ID,
    TEST_CLIENT_ID,
    SALESFORCE_USERNAME,
    TEST_URL,
  } = process.env;

  const privateKey = Buffer.from(BASE64_PRIVATE_KEY, "base64").toString(
    "utf-8"
  );

  try {
    // gets a new (if it hasn't expired it will send the still active token) access token from sales force
    const jwtTokenResponse = await getToken({
      iss: SALESFORCE_CLIENT_ID,
      sub: SALESFORCE_USERNAME,
      aud: TEST_URL,
      privateKey: privateKey,
    });

    return jwtTokenResponse.access_token;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching token:", error);
    }
    throw Error;
  }
};

const salesforcePaid = async (stripeId) => {
  // query to fetch the salesforce record id based on the stripeId
  const access_token = await getSalesForceAccessToken();
  let fetchData = JSON.stringify({
    query: `query payments ($stripeId: TextArea) {
        uiapi {
            query {
            npe01__OppPayment__c (where: { Stripe_Invoice_ID__c: { eq: $stripeId } }) {
                edges {
                node {
                    Id
                }
                }
            }
            }
        }
        }`,
    variables: { stripeId: stripeId },
  });

  let fetchConfig = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://escsocal--lc001.sandbox.my.salesforce.com/services/data/v58.0/graphql",
    headers: {
      "X-Chatter-Entity-Encoding": "false",
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
      Cookie: process.env.SALESFORCE_COOKIE_AUTH,
    },
    data: fetchData,
  };

  const fetchedRecordData = await axios.request(fetchConfig);

  // take the data back from the query and access the record id for the respective salesforce record id
  const recordId =
    fetchedRecordData.data.data.uiapi.query.npe01__OppPayment__c.edges[0];

  // get the current date in a format acceptable by salesforce
  const currentDate = new Date(
    Date.now() - new Date().getTimezoneOffset() * 60000
  )
    .toISOString()
    .split("T")[0];

  // use that record id to mark the invoice at that record id as paid in salesforce and include the current date paid
  let payData = JSON.stringify({
    allowSaveOnDuplicate: false,
    fields: {
      npe01__Paid__c: true,
      npe01__Payment_Method__c: "Credit Card",
      npe01__Payment_Date__c: currentDate,
    },
  });

  let config = {
    method: "patch",
    maxBodyLength: Infinity,
    url: `${process.env.SALESFORCE_API_URI}/${recordId.node.Id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
      Cookie: process.env.SALESFORCE_COOKIE_AUTH,
    },
    data: payData,
  };

  const resultant = await axios.request(config);
};

module.exports = { salesforcePaid };
