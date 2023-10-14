import axios from "axios";
// import { PaymentDetails } from "./type";
/**
 * GET invoice id from stripe
 * use this to read the invoice, then can use this basically as helper functions in other functions
 */

/**
 * GET opportunity record type from salesforce based on record number received from update
 * graphQL api call to salesforce for opportunity record type
 * @param string - invoice id from data change capture event
 * @return string - opportunity record type
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
  const oppType =
    fetchOppType.data.data.uiapi.query.Opportunity.edges[0].node.Type.value;
  return oppType;
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
