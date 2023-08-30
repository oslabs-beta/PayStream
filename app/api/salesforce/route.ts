import { NextRequest, NextResponse } from "next/server";

// use graphQL to manage api calls to Salesforce
const axios = require('axios');

let data = JSON.stringify({
	query: `query accounts {
  uiapi {
    query {
      npe01__OppPayment__c {
        edges {
          node {
            Id
            Invoice__c {
                value
            }
            Invoice_Sent_Date__c {
                value
            }
            npe01__Payment_Amount__c {
                value
            }
            Opportunity_Account_Name__c {
                value
            }
            npe01__Opportunity__c {
                value
            }
            npe01__Payment_Method__c {
                value
            }
            npe01__Payment_Date__c {
                value
            }
          }
        }
      }
    }
  }
}`,
	variables: {}
});


// need to see how authorization headers gt refreshed to confirm access
// need to move all credential headers to .env
let config = {
	method: 'post',
	maxBodyLength: Infinity,
	url: 'https://escsocal--lc001.sandbox.my.salesforce.com/services/data/v58.0/graphql',
	headers: {
		'X-Chatter-Entity-Encoding': 'false',
		'Content-Type': 'application/json',
		'Authorization': 'Bearer 00DEi000000QlCz!AQEAQPHNVpdi0ghLiwUIDUvt3hAixt2p1K4wej_mGnTQpCHkoXLvYCvliGwJBS31YpFm2pKISLmPVFPOp3z3gMdAz26FRHfJ',
		'Cookie': 'BrowserId=zo1yHUbnEe6OrN8Bc2JzEg; CookieConsentPolicy=0:1; LSKey-c$CookieConsentPolicy=0:1'
	},
	data: data
};

export const POST = async (req: NextRequest): Promise<NextResponse | undefined> => {
	try {
		const data = await axios.request(config);
		const paymentInfo = JSON.stringify(data.data.data.uiapi.query.npe01__OppPayment__c.edges);
		return new NextResponse(paymentInfo)
	}
	catch (err) {
		console.log(err)
		return new NextResponse("Internal Server Error", { status: 500 })
	}
}
