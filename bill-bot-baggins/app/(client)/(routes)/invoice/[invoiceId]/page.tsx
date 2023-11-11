import React from 'react';

import InvoiceDisplay from '@/components/InvoiceDisplay';
import { InvoiceId } from '@/lib/types';
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET;

async function getInvoiceData(token: string) {
  const { signal } = new AbortController();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/invoice?token=${token}`,
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
