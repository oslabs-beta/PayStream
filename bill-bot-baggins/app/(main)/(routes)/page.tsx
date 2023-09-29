// 09/27/2023 test link: http://localhost:3000/invoice?stripeInvoice=in_1Nv2UoHT7cVdV2e0iJEYuirV
import axios from 'axios';
import React from 'react';
import Link from 'next/link';
import { Button, Flex, Heading, Section } from '@radix-ui/themes';
import { auth } from '@clerk/nextjs';

export default function Home() {
  /**
   * @Robert - reefactoring to remove clerk from this?
   */
  const { userId, sessionId } = auth();

  if (!userId) {
    return null;
  }

  return (
    <Section className='flex h-5/6 w-full items-center justify-center'>
      Should rethink what we want to put here
    </Section>
  );
}
