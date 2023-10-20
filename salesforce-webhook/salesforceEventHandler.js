import {
  retreiveOppType,
  createStripeInvoice,
  updateSalesforceStripeId,
  getPaymentType,
} from "./fetchSalesforceAPI.js";

// List of opportunity record types from SAlesforce, would like to find a way to have this sent to the app, not manually updated
const recordTypes = [
  "SP",
  "BD",
  "FD",
  "LC",
  "RF",
  "OD",
  "FOC",
  "OA",
  "CA",
  "HR",
  "Customized",
  "SM",
  "CC",
  "EDLI",
  "DDP",
];

const updatedFields = [
  "npe01__Paid__c",
  "npe01__Payment_Amount__c",
  "npe01__Payment_Method__c",
  "npe01__Payment_Date__c",
  "npe01__Check_Reference_Number__c",
  "npe01__Written_Off__c",
  "OutsideFundingSource__c",
];
//need to store salesforce and stripe ids so that when /if a payment is deleted, it can get voided/deleted in stripe key-value = salesforce-stripe

const eventHandler = async (event) => {
  let opportunity;
  let paymentType = {};
  const { changeType, recordIds, changedFields } =
    event.payload.ChangeEventHeader;
  const { For_Chart__c, npe01__Payment_Amount__c, Name } = event.payload;
  const recordId = recordIds[0];
  // console.log("changedFields array: ", changedFields);

  // if the opp type that corresponds to the updated payment record is in our record types array enter switch cases

  switch (changeType) {
    /**
     *  if changeType is "create" AND payment type is cost to clientneed to create object for stripe invoice details:
     * customer name
     * customer email
     * payment invoice number
     * payment amount
     *
     * creates invoice in stripe
     */

    case "CREATE": {
      console.log("CREATE case changeType: ", changeType);
      // initialize variable to payment record ID
      paymentType = For_Chart__c;
      // assign opp variable to the evaluated result of retrieveOppType function passing in recordId
      if (paymentType.string == "Cost to Client")
        opportunity = await retreiveOppType(recordId);
      else
        console.log(
          "This event does not meet the requirements for creatings a stripe invoice"
        );
      if (recordTypes.includes(opportunity.type)) {
        const paymentAmount = npe01__Payment_Amount__c;
        const invoice_number = Name;
        console.log("payment amount: ", paymentAmount.double);

        // console.log("CREATE id: ", oppType);
        // if (paymentType.string === "Cost to Client") {
        // }
        const paymentDetails = {
          account_name: opportunity.account_name,
          amount: paymentAmount.double,
          project_type: opportunity.project_type,
          invoice_number: invoice_number.string,
        };
        //create invoice in stripe
        const stripeInvoice = await createStripeInvoice(paymentDetails);

        //update salesforce record with stripe invoice id
        await updateSalesforceStripeId(recordId, stripeInvoice.id);
      }
      break;
    }
    /**
     * if changeType is "update" /**
     * use changed fields to identify which properties to data capture and then find relevant invoice in stripe to update
     */
    case "UPDATE": {
      //currently hitting UPDATE with stripe id is added, will need to make an array of changes that are acceptable and want to do
      //logic to see if stripe invoice ID exists, if not, can we make it hit that route
      console.log("UPDATE case changeType: ", changeType);
      // only have invoice record id
      if (!For_Chart__c) {
        const clientPayment = getPaymentType(recordId);
        if (clientPayment) paymentType = "Cost to Client";
      }
      console.log("UPDATE payment type: ", paymentType);
      if (updatedFields.includes(changedFields[1])) {
        console.log("UPDATE change fields: ", changedFields[0]);
      }

      break;
    }
    case "DELETE": {
      //need to store salesforce and stripe ids so that when /if a payment is deleted, it can get voided/deleted in stripe
      console.log("DELETE case");
      break;
    }
    default: {
      console.log("default case hit: ", JSON.stringify(event, null, 2));
    }
  }
};
export default eventHandler;
