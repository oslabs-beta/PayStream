'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ServerResponse } from '../types';
import { StripeContainer } from '@/components';
import { PaymentProps } from '@/lib/types';

// payment display/record component
const PaymentRecord = () => {
  const [invoice, setInvoice] = useState<string>('');
  let paymentprops: PaymentProps;
  /**
   * define variablwe to give us access to this data betwen API calls
   * need to transition this to webhook
   */
  const fetchInvoiceData = async (): Promise<PaymentProps> => {
    const { data } = await axios.request<PaymentProps>({
      url: 'api/salesforce',
      method: 'post',
    });
    console.log(
      'fetched invoice data from salesforce via salesforce route: ',
      data
    );
    /**
     * need to set invoice or assign to props
     */
    paymentprops = data;
    // setInvoice(data);
    return paymentprops;
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
      <StripeContainer />
      {/* <button onClick={webhook}>bill-bot-baggins x webhook ???</button> */}
    </div>
  );
};

export default PaymentRecord;
