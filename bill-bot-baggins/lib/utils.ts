import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { getToken } from "sf-jwt-token";
import axios from "axios";
import { InvoiceProps, PaymentProps } from "./types";

const { TEST_CLIENT_ID, TEST_USERNAME, TEST_URL, BASE64_PRIVATE_KEY, SALESFORCE_GRAPHQL_URI, SALESFORCE_COOKIE_AUTH } = process.env;

/*
overview of API field names and what they reference
Opportunity_18_Digit_ID__c: 18 character unique ID
 npe01__Opportunity__c: references opportunity by name from the payment record
ID: unique reference id for the object
Invoice_Sent_Date__c: date sent
Invoice__c: Invoice number
Opportunity_Account_Name__c: account name of the opportunity (project) the payment is for
npe01__Payment_Amount__c: amount on invoice
npe01__Payment_Date__c: date invoice paid
npe01__Payment_Method__c: method of payment (cc, check, etc.)
*/

const data = JSON.stringify({
	query: `query payments {
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
            Opportunity_18_Digit_ID__c {
                value
            }
            Project_Number__c {
              value
              }
            npe01__Payment_Method__c {
                value
            }
            npe01__Payment_Date__c {
                value
            }
            npe01__Scheduled_Date__c{
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

export const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const updateSearchParams = (type: string, value: string) => {
  // Get the current URL search params
  const searchParams = new URLSearchParams(window.location.search);

  // Set the specified search parameter to the given value
  searchParams.set(type, value);

  // Set the specified search parameter to the given value
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getSalesForceAccessToken = async () => {
    // convert the base64 private key into a string
    const privateKey = Buffer.from(BASE64_PRIVATE_KEY, 'base64').toString('utf8');

    try {
      // gets a new (if it hasn't expired it will send the still active token) access token from sales force
      const jwtTokenResponse = await getToken({
        iss: TEST_CLIENT_ID,
        sub: TEST_USERNAME,
        aud: TEST_URL,
        privateKey: privateKey,
      });

      return jwtTokenResponse.access_token;
      }
     catch (error) {
      if (error instanceof Error) {
          console.error('Error fetching token:', error);
      }
	  throw Error;
    }
}

export const getSalesForceInvoiceData = async (accessToken: string) => {
	
	const res = await axios.request({
	  method: 'post',
	  maxBodyLength: Infinity,
	  url: SALESFORCE_GRAPHQL_URI,
	  headers: {
		'X-Chatter-Entity-Encoding': 'false',
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${accessToken}`,
		'Cookie': SALESFORCE_COOKIE_AUTH,
	  },
	  data: data,
	});

	// retrieve all invoice information from salesforce graphql call
	const paymentInfo = res.data.data.uiapi.query.npe01__OppPayment__c.edges;
  
	const invoices: PaymentProps[] = [];

	paymentInfo.map((record: InvoiceProps) => {
		const { Id, Invoice__c, Invoice_Sent_Date__c, npe01__Payment_Amount__c, Opportunity_Account_Name__c, Project_Number__c, npe01__Payment_Method__c, npe01__Payment_Date__c, npe01__Scheduled_Date__c } = record.node

		const invoice: PaymentProps = {
			sf_unique_id: Id,
			invoice_id: Invoice__c.value,
			amount: npe01__Payment_Amount__c.value,
			invoice_sent_date: Invoice_Sent_Date__c.value,
			payment_date: npe01__Payment_Date__c.value,
			invoice_due_date: npe01__Scheduled_Date__c.value,
			payment_method: npe01__Payment_Method__c.value,
			project_name: Project_Number__c.value,
			account_name: Opportunity_Account_Name__c.value,
		}

		invoices.push(invoice);

	  })
	  return invoices
  }

   // helper function to get the month (ex. 'Jan') from the date we get from SF ('2023-10-19')
  export const getMonthNameFromDueDate = (due_date: string) => {
    const date = new Date(due_date);
    return monthNames[date.getMonth()];
  };


  export const formatSalesForceData = (data: PaymentProps[] ) => {
    // creates a map to hold every month's data
    const revenueByMonth: Map<string, number> = new Map();

    // loop through each month and set each month (ex 'Jan') on the Map and its revenue data to 0
    for (const month of monthNames) {
      revenueByMonth.set(month, 0);
    }

    // loop through the resulting data from the SF graphQL and add its data to the specific month
    data.forEach((invoice) => {
      const { invoice_due_date, amount } = invoice;

      const month = getMonthNameFromDueDate(invoice_due_date as string);
      const currentRevenue = revenueByMonth.get(month) || 0;

      revenueByMonth.set(month, currentRevenue + amount);
    });

    // convert the map to an array
    const mappedData = Array.from(revenueByMonth, ([name, revenue]) => ({
      name,
      revenue,
    }));

    // set the invoice data with the mappedData
    return mappedData;
  };

