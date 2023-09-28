import axios from 'axios';

import React from 'react';
import Link from 'next/link';
import { Button, Flex, Heading, Section } from '@radix-ui/themes';
import StripeContainer from '@/components/StripeContainer';
import InvoiceDisplay from '@/components/InvoiceDisplay';
import { auth } from '@clerk/nextjs';

export default function Home() {
  const { userId, sessionId } = auth();

  const newData = async () => {
    const { data } = await axios.post('api/redis', {
      text: 'hello',
      tags: ['TypeScript', 'CSS'],
    });
    console.log(data);
  };

  if (!userId) {
    return null;
  }

  return !sessionId ? (
    <Section className='flex h-5/6 w-full items-center justify-center'>
      <Flex
        direction='column'
        justify='center'
        align='center'
        className='space-y-4 p-8'
      >
        <Heading size='8'>Welcome to BillBot Baggins</Heading>
        <div className='flex flex-row items-center justify-center gap-4'>
          <Button className='transition-all hover:scale-105 active:scale-100'>
            Client Login
          </Button>
          <Link href='/AdminLogin'>
            <Button
              variant='outline'
              className='transition-all hover:scale-105 active:scale-100'
            >
              Admin Login
            </Button>
          </Link>
        </div>
      </Flex>
    </Section>
  ) : (
    <Section className='flex h-5/6 flex-col items-center justify-center text-stone-300'>
      {/* conditionally render Payments display */}
      {/* Added "paymentsdisplay" in anticipation of component - button is in here to make API call, you can move this wherever */}
      {/* <PaymentsDisplay /> */}
      <InvoiceDisplay />
      <StripeContainer />
    </Section>
  );
}
