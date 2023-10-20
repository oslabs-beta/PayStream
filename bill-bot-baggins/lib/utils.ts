import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { getToken } from "sf-jwt-token";
import axios from "axios";
import { InvoiceProps, PaymentProps } from "./types";

type FetcherArgs = Parameters<typeof fetch>;
type FetcherResult<T> = Promise<T>;

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
		const { Id, Invoice__c, Invoice_Sent_Date__c, npe01__Payment_Amount__c, Opportunity_Account_Name__c, Opportunity_18_Digit_ID__c, npe01__Payment_Method__c, npe01__Payment_Date__c, npe01__Scheduled_Date__c } = record.node

		const invoice: PaymentProps = {
			sf_unique_id: Id,
			invoice_id: Invoice__c.value,
			amount: npe01__Payment_Amount__c.value,
			invoice_sent_date: Invoice_Sent_Date__c.value,
			payment_date: npe01__Payment_Date__c.value,
			invoice_due_date: npe01__Scheduled_Date__c.value,
			payment_method: npe01__Payment_Method__c.value,
			project_name: Opportunity_18_Digit_ID__c.value,
			account_name: Opportunity_Account_Name__c.value,
			stripe_invoice_id: 'stripeInvoiceId.data',
		}

		invoices.push(invoice);

	  })
	  return invoices
  }

  // export const fetcher = async (...args) => {
  //   const response = await fetch(...args);
  //   return response.json();
  // };

  export const fetcher = async (url: string, options?: RequestInit): Promise<any> => {
    const response = await fetch(url, options);
    return response.json();
  };

   // helper function to get the month (ex. 'Jan') from the date we get from SF ('2023-10-19')
  export const getMonthNameFromDueDate = (due_date: string) => {
    const date = new Date(due_date);
    return monthNames[date.getMonth()];
  };


