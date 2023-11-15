import React from 'react';
import { Badge, Box, Flex } from '@radix-ui/themes';
import InvoiceSection from '@/components/InvoiceSection';
import { AlertCircle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Stripe from 'stripe';
import { Button } from './ui/button';

export default function InvoiceDisplay({
  invoice,
  error,
}: {
  invoice: Stripe.Response<Stripe.Invoice> | undefined;
  error?: string;
}) {
  let invoiceDate: string, dueDate: string;

  if (invoice) {
    const created = new Date(invoice.created * 1000);
    invoiceDate = created.toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    const due = new Date((invoice.due_date as number) * 1000);
    dueDate = due.toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }
  return invoice && !error ? (
    <div className='flex h-full w-full flex-col items-center justify-center'>
      <h1 className='flex w-full max-w-[900px] items-center gap-3 pb-4 text-2xl font-bold'>
        Invoice
        {invoice.status === 'open' ? (
          <Badge variant='outline' className='bg-amber-500/20 text-amber-300'>
            {invoice.status}
          </Badge>
        ) : invoice.status === 'paid' ? (
          <Badge variant='outline' className='bg-green-500/20 text-green-300'>
            {invoice.status}
          </Badge>
        ) : (
          <Badge variant='outline' className='bg-rose-500/20 text-rose-300'>
            {invoice.status}
          </Badge>
        )}
      </h1>
      <Card className='w-full max-w-[900px] border border-neutral-700 bg-neutral-800'>
        <CardHeader className='flex flex-row justify-between'>
          <CardTitle>
            #<span className='font-bold text-white/90'>{invoice.number}</span>
          </CardTitle>
          <CardDescription className='flex flex-col font-bold text-white/80'>
            <span className='flex flex-col font-bold'>
              Executive Service Corps{' '}
              <span className='text-xs font-normal text-neutral-400'>
                1000 Alameda St
              </span>
              <span className='text-xs font-normal text-neutral-400'>
                Los Angeles, CA 90012
              </span>
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col justify-between gap-3'>
          <Card className='w-full border border-neutral-700 bg-neutral-800/80 pt-10 text-white/80'>
            <CardContent className='flex w-full justify-between'>
              <div className='flex flex-col space-y-8'>
                <InvoiceSection
                  title='Invoice Date'
                  invoiceData={invoiceDate!}
                />
                <InvoiceSection title='Payment Due' invoiceData={dueDate!} />
              </div>
              <div className='flex flex-col'>
                <InvoiceSection
                  title='Bill to'
                  invoiceData={invoice.customer_name}
                />
                {invoice.customer_address && (
                  <div className='text-xs'>
                    <span>{invoice.customer_address.line1}</span>
                    <span>{invoice.customer_address.line2}</span>
                    <span>
                      {invoice.customer_address.city},{' '}
                      <span>{invoice.customer_address.state}</span>{' '}
                      <span>{invoice.customer_address.postal_code}</span>
                    </span>
                  </div>
                )}
              </div>
              <InvoiceSection
                title='Sent to'
                invoiceData={invoice.customer_email}
              />
            </CardContent>
          </Card>
          <Card className='border border-neutral-700 bg-neutral-800/80 text-white/80'>
            <CardContent>
              <div className='flex justify-between rounded-md p-10'>
                <div className='flex'>
                  <InvoiceSection
                    title='Item Name'
                    invoiceData={invoice.lines.data[0].description}
                  />
                </div>
                <div className='flex justify-between space-x-12'>
                  <InvoiceSection
                    title='QTY'
                    invoiceData={invoice.lines.data[0].quantity}
                    variant={true}
                  />
                  <InvoiceSection
                    title='Price'
                    invoiceData={(
                      (invoice.lines.data[0].price?.unit_amount as number) / 100
                    ).toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}
                    variant={true}
                  />
                  <InvoiceSection
                    title='Total'
                    invoiceData={(
                      (invoice.amount_remaining as number) / 100
                    ).toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}
                    variant={true}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
        <CardFooter>
          <div className='flex w-full space-x-4'>
            {invoice.status === 'open' ? (
              <Button className='rounded-full bg-indigo-500/80 transition-all hover:scale-105 hover:bg-indigo-500 active:scale-100'>
                <a href={invoice.hosted_invoice_url as string}>Pay Invoice</a>
              </Button>
            ) : (
              <Button className='rounded-full bg-neutral-700' disabled={true}>
                Pay Invoice
              </Button>
            )}
            <Button
              variant='outline'
              className='hover:text-inidigo-400 rounded-full border border-indigo-500 bg-transparent text-indigo-400 transition-all hover:scale-105 hover:bg-neutral-900/20 active:scale-100'
            >
              <a href={invoice.invoice_pdf as string}>Download Invoice</a>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  ) : (
    <div className='absolute top-0 flex h-[100%] w-full items-center justify-center bg-neutral-950/60 backdrop-blur-sm'>
      <Card className='bg-neutral-900'>
        <CardContent>
          <CardHeader>
            <CardTitle className='flex items-center gap-1 text-lg text-red-500'>
              <AlertCircle className='h-4 w-4' />
              Error
            </CardTitle>
            <CardDescription>
              Invalid payment link. Please check the link and try again.
            </CardDescription>
          </CardHeader>
        </CardContent>
      </Card>
    </div>
  );
}
