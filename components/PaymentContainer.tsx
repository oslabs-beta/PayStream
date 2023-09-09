'use client';
import { useState } from 'react';
import Image from 'next/image';
import { PaymentProps } from '@/lib/types';

interface PaymentContProps {
  payment: PaymentProps;
}

const PaymentContainer = ({ payment }: PaymentContProps) => {
  const { invoice_id, payment_date, amount } = payment;
  return (
    <div className=''>
      <div className=''>
        <h1>Invoice number: {invoice_id}</h1>
        <h1 className=''>Payment Due Date: {payment_date}</h1>
        <h2 className=''>Payment ID: {amount}</h2>
      </div>
    </div>
  );
};

export default PaymentContainer;
