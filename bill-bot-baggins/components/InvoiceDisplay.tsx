import React from 'react';
import { Badge, Box, Button, Flex } from '@radix-ui/themes';
import InvoiceSection from '@/components/InvoiceSection';
import { AlertCircle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Stripe from 'stripe';

export default function InvoiceDisplay({
  invoice,
}: {
  invoice: Stripe.Response<Stripe.Invoice> | undefined;
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
  return invoice ? (
    <div className='flex h-full w-full flex-col items-center justify-center space-y-4'>
      <main className='flex h-full w-full flex-col items-center justify-center space-y-3 px-4 md:w-5/6 md:px-0 lg:w-4/6 xl:w-1/2'>
        <h1 className='flex w-full items-center gap-3 text-2xl font-bold'>
          Invoice
          {invoice.status === 'open' ? (
            <Badge size='2' color='yellow'>
              {invoice.status}
            </Badge>
          ) : invoice.status === 'paid' ? (
            <Badge size='2' color='green'>
              {invoice.status}
            </Badge>
          ) : (
            <Badge size='2' color='ruby'>
              {invoice.status}
            </Badge>
          )}
        </h1>
        <section className='flex w-full flex-col space-y-8 rounded-lg bg-neutral-800 p-10 text-white/80 '>
          <Flex justify='between' width='100%'>
            <Box>
              <p className='text-xl'>
                #
                <span className='font-bold text-white/90'>
                  {invoice.number}
                </span>
              </p>
            </Box>
            {/* Not sure if the address is necessary here (ask Chandler about this) */}
            <p className='flex flex-col font-bold'>
              Executive Service Corps{' '}
              <span className='text-xs font-normal'>1000 Alameda St</span>
              <span className='text-xs font-normal'>Los Angeles, CA 90012</span>
            </p>
          </Flex>
          <Flex justify='between' className='pr-12'>
            <div className='flex flex-col space-y-8'>
              <InvoiceSection title='Invoice Date' invoiceData={invoiceDate!} />
              <InvoiceSection title='Payment Due' invoiceData={dueDate!} />
            </div>
            <div className='flex flex-col'>
              <InvoiceSection
                title='Bill to'
                invoiceData={invoice.customer_name}
              />
              {invoice.customer_address && (
                <div className='text-xs'>
                  <p>{invoice.customer_address.line1}</p>
                  <p>{invoice.customer_address.line2}</p>
                  <p>
                    {invoice.customer_address.city},{' '}
                    <span>{invoice.customer_address.state}</span>{' '}
                    <span>{invoice.customer_address.postal_code}</span>
                  </p>
                </div>
              )}
            </div>
            <InvoiceSection
              title='Sent to'
              invoiceData={invoice.customer_email}
            />
          </Flex>
          <div className='flex justify-between rounded-md bg-gray-400/10 p-10'>
            <Flex justify='between'>
              <InvoiceSection
                title='Item Name'
                invoiceData={invoice.lines.data[0].description}
              />
            </Flex>
            <Flex justify='between' className='space-x-12' align='center'>
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
            </Flex>
          </div>
          <div className='w-full space-x-4'>
            {invoice.status === 'open' ? (
              <Button
                size='3'
                className='transition-all hover:scale-105 active:scale-100'
              >
                <a href={invoice.hosted_invoice_url as string}>Pay Invoice</a>
              </Button>
            ) : (
              <Button size='3' disabled={true}>
                Pay Invoice
              </Button>
            )}
            <Button
              size='3'
              variant='outline'
              className='transition-all hover:scale-105 active:scale-100'
            >
              <a href={invoice.invoice_pdf as string}>Download Invoice</a>
            </Button>
          </div>
        </section>
      </main>
    </div>
  ) : (
    <div className='absolute flex h-[100%] w-full items-center justify-center bg-neutral-950/60 backdrop-blur-sm'>
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
