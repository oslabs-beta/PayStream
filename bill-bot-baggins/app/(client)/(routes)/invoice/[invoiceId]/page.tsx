import React from 'react';

import InvoiceDisplay from '@/components/InvoiceDisplay';
import { InvoiceId } from '@/lib/types';
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET;

async function getInvoiceData(token: string) {
  const { signal } = new AbortController();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/invoice?token=${token}`,
    // had to add params since this is now a GET request (RH)
    {
      signal,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return res.json();
}

async function InvoicePage({ params }: { params: InvoiceId }) {
  const { invoiceId } = params;

  // creates the JWT using the invoiceId in the params and a secretKey
  const token = jwt.sign({ invoiceId }, secretKey, { expiresIn: '1h' });
  /**
   * renders invoice display component that holds invoice information from stripe
   * invoice display component hold stripe container that uses search params to query relevant client invoice
   * 09/27/2023 test link: http://localhost:3000/invoice/in_1Nv2UoHT7cVdV2e0iJEYuirV
   */
  const data = await getInvoiceData(token);

  return (
    <section className='flex h-5/6 w-full flex-col items-center justify-center'>
      {!data.error ? (
        <InvoiceDisplay invoice={data} />
      ) : (
        <InvoiceDisplay invoice={undefined} />
      )}
    </section>
  );
}

export default InvoicePage;
