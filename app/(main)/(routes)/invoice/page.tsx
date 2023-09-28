import InvoiceDisplay from '@/components/InvoiceDisplay';
import React from 'react';
import { Section } from '@radix-ui/themes';

function InvoicePage() {
  return (
    <Section className='flex h-5/6 flex-col items-center justify-center'>
      <InvoiceDisplay />
    </Section>
  );
}

export default InvoicePage;
