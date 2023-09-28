import axios from 'axios';

import React from 'react';
import Link from 'next/link';
import { Button, Flex, Heading, Section } from '@radix-ui/themes';
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

  return (
    <Section className='flex h-5/6 w-full items-center justify-center'>
      Should rethink what we want to put here
    </Section>
  );
}
