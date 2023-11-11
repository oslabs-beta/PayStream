import React from 'react';

import InvoiceDisplay from '@/components/InvoiceDisplay';
import { InvoiceId } from '@/lib/types';
import jwt from 'jsonwebtoken';
import { getStripeInvoiceData } from '@/lib/utils';
import Stripe from 'stripe';

const secretKey = process.env.JWT_SECRET;

async function InvoicePage({ params }: { params: InvoiceId }) {
  const { invoiceId } = params;

  // creates the JWT using the invoiceId in the params and a secretKey
  const token = jwt.sign({ invoiceId }, secretKey, { expiresIn: '1h' });
  const data: Stripe.Response<Stripe.Invoice> | undefined =
    await getStripeInvoiceData(token);

  return (
    <section className='flex h-5/6 w-full flex-col items-center justify-center'>
      {data ? (
        <InvoiceDisplay invoice={data} />
      ) : (
        <InvoiceDisplay invoice={undefined} />
      )}
    </section>
  );
}

export default InvoicePage;
