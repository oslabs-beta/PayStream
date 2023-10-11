import InvoiceDisplay from '@/components/InvoiceDisplay';
import React from 'react';
import { Section } from '@radix-ui/themes';

function InvoicePage() {
  /**
   * renders invoice display component that holds invoice information from stripe
   * invoice display component hold stripe container that uses search params to query relevant client invoice
   * 09/27/2023 test link: http://localhost:3000/invoice?stripeInvoice=in_1Nv2UoHT7cVdV2e0iJEYuirV
   */
  return (
    <Section className='flex h-5/6 flex-col items-center justify-center'>
			{/* invoice display renders the stripe container, stripe container fetches data from stripe to display on this page */}
      <InvoiceDisplay />
    </Section>
  );
}

export default InvoicePage;
