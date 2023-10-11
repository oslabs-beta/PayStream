import React from 'react';
import { Section } from '@radix-ui/themes';

import InvoiceDisplay from '@/components/InvoiceDisplay';
import { InvoiceId } from '@/lib/types';
import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_API_KEY;

function InvoicePage({ params }: { params: InvoiceId }) {
  const { invoiceId } = params;

  // creates the JWT using the invoiceId in the params and a secretKey
  const token = jwt.sign({ invoiceId }, secretKey, { expiresIn: '1h' });
  /**
   * renders invoice display component that holds invoice information from stripe
   * invoice display component hold stripe container that uses search params to query relevant client invoice
   * 09/27/2023 test link: http://localhost:3000/invoice?stripeInvoice=in_1Nv2UoHT7cVdV2e0iJEYuirV
   */
  return (
    <Section className='flex h-5/6 w-full flex-col items-center justify-center'>
      <InvoiceDisplay token={token} />
    </Section>
  );
}

export default InvoicePage;
