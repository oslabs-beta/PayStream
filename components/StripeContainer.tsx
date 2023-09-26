'use client';

import axios from 'axios';
import React from 'react';
import { useState, useEffect, use } from 'react';
import InvoiceButton from './InvoiceButton';

export default function StripeContainer() {
  const [invoice, setInvoice] = useState();

  const [id, setId] = useState([]); // need to discuss when this is set (getting id from link sent from salesforce?)

  // on page load, fetch stripe invoice data to store as props on button
  useEffect(() => {
    fetchInvoice(id);
  }, []);

  const fetchInvoice = async (id: any) => {
    const { data }: any = await axios.post(
      '/api/invoice',
      {
        id: id,
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

  return (
    <section className='w-full'>
      {invoice && <InvoiceButton id={invoice.id} invoice={invoice} />}
    </section>
  );
}
