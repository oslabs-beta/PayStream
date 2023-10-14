import axios from "axios";
// import { PaymentDetails } from "./type";
/**
 * GET invoice id from stripe
 * use this to read the invoice, then can use this basically as helper functions in other functions
 */

/**
 * get opp record Id from payment record ID
 */
const getOppRecordId = async (id) => {
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
  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data.uiapi));
      return;
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * GET opportunity record type from salesforce based on record number received from update
 * graphQL api call to salesforce for opportunity record type
 * @param string - invoice id from data change capture event
 * @return string - opportunity record type
 */
const getOppRecordType = (id) => {
  // const fetchOppId = await getOppRecordId(id);

  // graphQL schemas passed as "data" property on axios request config
  const oppIdData = {};
  const oppIdConfig = {};

  // const data = await axios.request(oppIdConfig);
  console.log("getOppRecord type() record id: ", id);
  const oppId = {
    type: "opportunity",
    id: id,
  };
  return oppId;
};

/**
 *  POST invoice in stripe
 * where are we sending the data that we get from Sf?
 * 	stripe - primary contact email address to create
 * 	redis cache
 * @param Object - data needed to create stripe invoice
 * @return stripe invoice ID
 */

/**
 * PATCH invoice in stripe
 */

/**
 * DELETE invoice in stripe
 */

export default getOppRecordType;
