import React from 'react';
import { StripeContainer } from '@/components';
import { Token } from '@/lib/types';

export default function InvoiceDisplay({ token }: Token) {
  return (
    <main className='flex h-full w-full flex-col items-center justify-center space-y-4'>
      <StripeContainer token={token} />
    </main>
  );
}
