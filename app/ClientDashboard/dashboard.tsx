'use client';
import { PaymentContainer, SearchFilter } from '@/components';
import { Heading, Text, Card, Box } from '@radix-ui/themes';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { projects, payRange, test } from '@/hardcoded';

export const Dashboard = () => {
  const payments = test;
  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      <div className='flex flex-row items-center justify-center gap-4'>
        <Heading>Upcoming Payments</Heading>
        <Text>Filter by:</Text>
        <SearchFilter title='projects' options={projects} />
        <SearchFilter title='payRange' options={payRange} />
      </div>
      <Card>
        <Box>
          <PaymentContainer
            payment={{
              invoice_id: 'ID_015',
              payment_date: 'August 3, 2023',
              amount: 9392,
            }}
          ></PaymentContainer>
        </Box>
      </Card>
    </div>
  );
};
