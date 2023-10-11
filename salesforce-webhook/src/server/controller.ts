import axios from "axios";
import { PaymentDetails } from "../type";
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
export const getOppRecordType = async (invoiceId: string): Promise<String> => {
	//need to update config options with graphQL schema
	// graphQL schemas passed as "data" property on axios request config
	const oppIdData = {}
	const oppIdConfig = {}
	// axios request params for retrieving opportunity information
	const oppId: string = await axios.request(oppIdConfig)

	const oppTypeData = {}
	const oppTypeConfig = {}
	const oppRecordType: string = await axios.request(oppTypeConfig);

	return oppRecordType;
}

/**
 *  POST invoice in stripe
 * where are we sending the data that we get from Sf?
 * 	stripe - primary contact email address to create
 * 	redis cache
 * @param Object - data for stripe invoice
 */


/**
 * PATCH invoice in stripe
 */

/**
 * DELETE invoice in stripe
 */

// export default controller;