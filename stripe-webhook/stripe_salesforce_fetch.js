import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const salesforcePaid = async (stripeId) => {

    // query to fetch the salesforce record id based on the stripeId

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
        variables: {"stripeId":stripeId}
    });
    
    let fetchConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://escsocal--lc001.sandbox.my.salesforce.com/services/data/v58.0/graphql',
      headers: { 
        'X-Chatter-Entity-Encoding': 'false', 
        'Content-Type': 'application/json', 
        'Authorization': process.env.SALESFORCE_TOKEN, 
        'Cookie': process.env.SALESFORCE_COOKIE_AUTH
      },
      data : fetchData
    };
    
    const fetchedRecordData = await axios.request(fetchConfig)

    // take the data back from the query and access the record id for the respective salesforce record id
    const recordId = fetchedRecordData.data.data.uiapi.query.npe01__OppPayment__c.edges[0].node.Id;

    // get the current date in a format acceptable by salesforce
    const currentDate = (new Date(Date.now() - (new Date()).getTimezoneOffset()*60000)).toISOString().split('T')[0] 

    // use that record id to mark the invoice at that record id as paid in salesforce and include the current date paid
    let payData = JSON.stringify({
        "allowSaveOnDuplicate": false,
        "fields": {
            "npe01__Paid__c": true,
            "npe01__Payment_Method__c": "Credit Card",
            "npe01__Payment_Date__c": currentDate
        }
    });

    let config = {
    method: 'patch',
    maxBodyLength: Infinity,
    url: `https://escsocal--lc001.sandbox.my.salesforce.com/services/data/v58.0/ui-api/records/${recordId}`,
    headers: { 
        'Content-Type': 'application/json', 
        'Authorization': process.env.SALESFORCE_TOKEN, 
        'Cookie': process.env.SALESFORCE_COOKIE_AUTH
    },
    data : payData
    };

    const resultant = await axios.request(config);

}
