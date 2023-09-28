'use client';

import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import InvoiceButton from './InvoiceButton';
import { Card, Flex, Heading } from '@radix-ui/themes';

type invoiceDataProps = {
  account_name: string;
  amount_due: number;
  amount_paid: number;
  amount_remaining: number;
  customer: string;
  customer_email: string;
  customer_name: string;
  due_date: number;
  id: string;
};

export default function StripeContainer() {
  const [invoice, setInvoice] = useState();
  const [invoiceData, setInvoiceData] = useState<invoiceDataProps | null>(null);
  const [invoiceId, setInvoiceId] = useState('in_1NlzoQHT7cVdV2e0To8zJ080'); // need to discuss when this is set (getting id from link sent from salesforce?)

  useEffect(() => {
    fetchInvoice(invoiceId);
  }, []);

  const fetchInvoice = async (id: any) => {
    const { data }: any = await axios.post(
      '/api/invoice',
      {
        invoiceId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    setInvoiceData(data);
    console.log('data back from fetch invoice is: ', data);
    setInvoice(data);
  };

  return (
    // <section className='flex w-full flex-col items-center justify-center space-y-8'>
    //   <Heading>Invoice Details</Heading>
    //   <Flex width='100%' justify='center'>
    //     <div className='w-1/3 text-white/70'>
    //       <p className='flex items-center justify-between'>
    //         Customer:{' '}
    //         <span className='font-bold text-white/90'>
    //           {invoiceData?.customer_name}
    //         </span>
    //       </p>
    //       <p className='flex items-center justify-between'>
    //         Account:{' '}
    //         <span className='font-bold text-white/90'>
    //           {invoiceData?.account_name}
    //         </span>
    //       </p>
    //       <p className='flex items-center justify-between'>
    //         Amount Due:{' '}
    //         <span className='font-bold text-white/90'>
    //           {invoiceData?.amount_due}
    //         </span>
    //       </p>
    //       <p className='flex items-center justify-between'>
    //         Amount Paid:{' '}
    //         <span className='font-bold text-white/90'>
    //           {invoiceData?.amount_paid}
    //         </span>
    //       </p>
    //       <p className='flex items-center justify-between'>
    //         Amount Remaining:{' '}
    //         <span className='font-bold text-white/90'>
    //           {invoiceData?.amount_remaining}
    //         </span>
    //       </p>
    //       <p className='flex items-center justify-between'>
    //         Due Date:{' '}
    //         <span className='font-bold text-white/90'>
    //           {invoiceData?.due_date}
    //         </span>
    //       </p>
    //       <p className='flex items-center justify-between'>
    //         Invoice ID:{' '}
    //         <span className='font-bold text-white/90'>{invoiceData?.id}</span>
    //       </p>
    //     </div>
    //   </Flex>
    // </section>
    <>{invoice && <InvoiceButton invoice={invoice} />}</>
  );
}
