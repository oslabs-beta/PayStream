import React from 'react';
import Stripe from 'stripe';

import InvoiceDisplay from '@/components/InvoiceDisplay';
import { InvoiceId } from '@/lib/types';
import { getStripeInvoiceData } from '@/lib/api';

async function InvoicePage({ params }: { params: InvoiceId }) {
  const { invoiceId } = params;

  const data = await getStripeInvoiceData(invoiceId);

  return (
    <section className='flex h-full w-full flex-col items-center justify-center'>
      {data instanceof Stripe.errors.StripeError ? (
        <InvoiceDisplay invoice={undefined} error={data.message} />
      ) : (
        <InvoiceDisplay invoice={data} />
      )}
    </section>
  );
}

export default InvoicePage;
