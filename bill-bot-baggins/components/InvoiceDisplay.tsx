import React from 'react';
import { StripeContainer } from '@/components';

type tokenProps = {
  token: string;
};

export default function InvoiceDisplay({ token }: tokenProps) {
  return (
    <main className='flex h-full w-full flex-col items-center justify-center space-y-4'>
      <StripeContainer token={token} />
    </main>
  );
}
