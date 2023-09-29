'use client';

import React, { useState, useEffect } from 'react';
import { Box, Button, Flex } from '@radix-ui/themes';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import Stripe from 'stripe';

import InvoiceButton from '@/components/InvoiceButton';

export default function StripeContainer() {
  const searchParams = useSearchParams();
  const [invoice, setInvoice] =
    useState<Stripe.Response<Stripe.Invoice> | null>(null);
  const [invoiceId, setInvoiceId] = useState<string | null>(
    searchParams.get('stripeInvoice')
  ); // need to discuss when this is set (getting id from link sent from salesforce?)

  useEffect(() => {
    fetchInvoice();
  }, []);

  const fetchInvoice = async () => {
    const { data }: { data: Stripe.Response<Stripe.Invoice> } =
      await axios.post(
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
    console.log('data back from fetch invoice is: ', data);
    setInvoice(data);
  };

  // convert the dates from stripes format to human readable format

  let invoiceDate;
  let dueDate;

  if (invoice) {
    const created = new Date(invoice.created * 1000);
    invoiceDate = created.toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    const due = new Date(invoice.due_date! * 1000);
    dueDate = due.toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  return invoice ? (
    <>
      <Flex justify='between' width='100%'>
        <Box>
          <p className='text-xl'>
            #<span className='font-bold text-white/90'>{invoice.id}</span>
          </p>
        </Box>
        <p>{invoice?.account_name}</p>
      </Flex>
      <Flex justify='between' className='pr-12'>
        <div className='flex flex-col space-y-8'>
          <Flex direction='column' className='space-y-2'>
            <h3 className='text-xs'>Invoice Date</h3>
            <p className=' font-bold'>{invoiceDate}</p>
          </Flex>
          <Flex direction='column' className='space-y-2'>
            <h3 className='text-xs'>Payment Due</h3>
            <p className=' font-bold'>{dueDate}</p>
          </Flex>
        </div>
        <div className='space-y-2'>
          <h3 className='text-xs'>Bill to</h3>
          <p className='font-bold'>{invoice.customer_name}</p>
        </div>
        <div className='space-y-2'>
          <h3 className='text-xs'>Sent to</h3>
          <p className=' font-bold'>{invoice.customer_email}</p>
        </div>
      </Flex>
      <div className='flex justify-between rounded-md bg-gray-400/10 p-10'>
        <Flex justify='between'>
          <div className='space-y-2'>
            <h3 className='text-xs'>Item Name</h3>
            <p className='font-bold'>{invoice.lines.data[0].description}</p>
          </div>
        </Flex>
        <Flex justify='between' className='space-x-12' align='center'>
          <div className='flex flex-col items-center space-y-2'>
            <h3 className='text-xs'>QTY</h3>
            <p className='font-bold'>1</p>
          </div>
          <div className='flex flex-col items-end space-y-2'>
            <h3 className='text-xs'>Price</h3>
            <p className='font-bold'>${invoice.amount_due! / 100}.00</p>
          </div>
          <div className='flex flex-col items-end space-y-2'>
            <h3 className='text-xs'>Total</h3>
            <p className='font-bold'>${invoice.amount_due! / 100}.00</p>
          </div>
        </Flex>
      </div>
      <div className='w-full space-x-4'>
        <InvoiceButton invoice={invoice} />
        <Button
          size='3'
          variant='outline'
          className='transition-all hover:scale-105 active:scale-100'
        >
          <a href={invoice.invoice_pdf!}>Download Invoice</a>
        </Button>
      </div>
    </>
  ) : (
    // only temporary, should be a skeleton instead of a loading div
    <div>Loading...</div>
  );
}
