'use client';
import { useState } from 'react';
import Image from 'next/image';
import { PaymentProps } from '@/lib/types';
import { Heading, Text, Card, Box } from '@radix-ui/themes';

interface PaymentContProps {
  payment: PaymentProps;
}


const PaymentContainer = ({ payment }: PaymentContProps) => {
  const { project_name, invoice_id, invoice_sent_date, invoice_due_date, amount } = payment;
  return (
    <div className=''>
      <div className=''>
        <Box>
          <Card>
        <h1>Invoice number: {invoice_id}</h1>
        <h1>Associated Project: {project_name}</h1>
        <h1 className=''>Payment Due Date: {invoice_due_date}</h1>
        <h2 className=''>Amount Due: {amount}</h2>
        </Card>
        </Box>
      </div>
    </div>
  );
};

export default PaymentContainer;
