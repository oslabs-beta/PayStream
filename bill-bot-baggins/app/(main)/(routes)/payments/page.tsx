'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StripeContainer } from '@/components';
import { PaymentProps, ServerResponse } from '@/lib/types';
import crypto from 'crypto';
import FormData from 'form-data';
/**
 * this componenet is currently housing buttons to test REST API routes for salesforce and redis.
 * the salesforce webhook works, so this code may need to be modularized and moved to other relevant components
 */
function base64URLEncode(str: any): any {
  return str
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}
var code_verifier = base64URLEncode(crypto.randomBytes(32));

// Dependency: Node.js crypto module
// https://nodejs.org/api/crypto.html#crypto_crypto
function sha256(buffer: any) {
  return crypto.createHash('sha256').update(buffer).digest();
}
var code_challenge = base64URLEncode(sha256(code_verifier));

// payment display/record component
const PaymentRecord = () => {
  const [invoice, setInvoice] = useState<string>('');
  let paymentprops: PaymentProps;
  /**
   * define variable to give us access to this data betwen API calls
   * need to transition this to webhook
   */
  const fetchInvoiceData = async (): Promise<any> => {
    const { data } = await axios.request<any>({
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://test.salesforce.com/services/oauth2/authorize?response_type=code&client_id=3MVG9xfrbKQ6hBytByscaxk3UqZ4mFLvo0nP3U7oPIB4VO9rpgPuo6yp8zFkmAcJ9PUcjECjdGR72QS7DW2CL&redirect_uri=https://test.salesforce.com&code_challenge_method=S256&code_challenge=${code_challenge}&scope=refresh_token api`,
      headers: {
        // 'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        Cookie:
          'BrowserId=Bda6AUedEe6auBt_rSvqKg; CookieConsentPolicy=0:1; LSKey-c$CookieConsentPolicy=0:1',
      },
    });
    console.log('data: ', data);
    /**
     * need to set invoice or assign to props
     */
    // paymentprops = data;
    // setInvoice(data);
    // return paymentprops;
  };

  // retrieves cached invoice records and puts them in a more readble object format to display as payment records
  const redisConnect = async (): Promise<ServerResponse> => {
    const { data } = await axios.request<ServerResponse>({
      url: '/api/redis',
      method: 'post',
      data: paymentprops,
    });
    console.log(data);
    return data;
  };

  // webhook function placeholder below
  // const webhook = async (): Promise<ServerResponse> => {};

  // put axios request inside of useEffect hook and have "newData" update state
  // const payments = invoiceData();
  // console.log(payments);

  return (
    <div className='w-full max-w-sm lg:flex lg:max-w-full'>
      <button
        className='rounded border border-gray-400 bg-white px-4 py-2 font-semibold text-gray-800 shadow hover:bg-gray-100'
        onClick={fetchInvoiceData}
      >
        bill-bot-baggins x salesforce route
      </button>

      <button
        className='rounded border border-gray-400 bg-white px-4 py-2 font-semibold text-gray-800 shadow hover:bg-gray-100'
        onClick={redisConnect}
      >
        bill-bot-baggins x redis
      </button>
      {/* <StripeContainer /> */}
      {/* <button onClick={webhook}>bill-bot-baggins x webhook ???</button> */}
    </div>
  );
};

export default PaymentRecord;
