import React from 'react';
import axios from 'axios';
import Stripe from 'stripe';
import { Button } from '@radix-ui/themes';

type InvoiceButtonProps = {
  invoice: Stripe.Response<Stripe.Invoice>;
};

const InvoiceButton = ({ invoice }: InvoiceButtonProps) => {
  console.log('Invoice Button: ', invoice);
  const handlePayment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { data } = await axios.post(
      '/api/payment',
      {
        invoiceId: invoice,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    window.location.assign(data);
  };

  return (
    <Button
      size='3'
      className='transition-all hover:scale-105 active:scale-100'
      onClick={handlePayment}
    >
      Pay Invoice
    </Button>
  );
};

export default InvoiceButton;
