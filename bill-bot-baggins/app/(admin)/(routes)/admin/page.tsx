import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Overview from '@/components/overview';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { columns } from '@/components/Columns';
import React from 'react';
import { RecentSales } from '@/components/RecentSales';
import { DataTable } from '@/components/DataTable';
import {
  getSalesForceAccessToken,
  getSalesForceInvoiceData,
  formatSalesForceData,
} from '@/lib/utils';

import type { PaymentProps } from '@/lib/types';

async function AdminDashboardPage() {
  // get SF accessToken
  const accessToken = await getSalesForceAccessToken();
  // get SF invoice data using accessToken
  const data = await getSalesForceInvoiceData(accessToken);

  /*
  Gets total amount of all payments to use as revenue data in the overview component 
  */
  let revenue = 0;
  let monthrevenue = 0;
  let pastmonthrevenue = 0;
  let outstandingInvoices = 0;
  let pastyearrevenue = 0;
  const payments: PaymentProps[] = [];
  const currentYear = new Date().getFullYear().toString();
  const pastYear = (new Date().getFullYear() - 1).toString();
  const currentMonth = (new Date().getMonth() + 1).toString();
  const pastMonth = new Date().getMonth().toString();
  const currentDate = new Date();

  // gets 5 payments to display in the recent payments (need to change this to be only the most recent 5 payments)
  for (let i = 0; i < data.length && i < 5; i++) {
    if (data[i].payment_date && data[i].payment_date?.includes(currentYear)) {
      payments.push(data[i]);
    }
  }

  // get the total revenue to display
  data.forEach((invoice) => {
    if (invoice.payment_date && invoice.payment_date.includes(currentYear)) {
      revenue += invoice.amount;
    }
  });

  data.forEach((invoice) => {
    if (invoice.payment_date && invoice.payment_date.includes(pastYear)) {
      pastyearrevenue += invoice.amount;
    }
    if (
      invoice.payment_date &&
      invoice.payment_date.slice(5, 7).includes(currentMonth)
    ) {
      monthrevenue += invoice.amount;
    }
    if (
      invoice.payment_date &&
      invoice.payment_date.slice(5, 7).includes(pastMonth)
    ) {
      pastmonthrevenue += invoice.amount;
    }
    if (
      invoice.invoice_due_date &&
      new Date(invoice.invoice_due_date) < currentDate &&
      invoice.payment_date == undefined
    ) {
      outstandingInvoices += 1;
    }
  });
  const monthrevenuegrowth =
    monthrevenue / pastmonthrevenue < Infinity
      ? monthrevenue / pastmonthrevenue
      : 100;
  const yearrevenuegrowth =
    revenue / pastyearrevenue < Infinity ? revenue / pastyearrevenue : 100;

  const mappedData = formatSalesForceData(data);

  return (
    <div className='aspect-auto h-full flex-1 space-y-4 pt-4 xl:h-5/6 xl:pl-36'>
      <div className='flex items-center justify-between space-y-2'>
        <h2 className='text-3xl font-bold tracking-tight'>Dashboard</h2>
        <div className='flex items-center space-x-2'></div>
      </div>
      <Tabs defaultValue='overview' className='space-y-4'>
        <TabsList>
          <TabsTrigger value='overview'>Overview</TabsTrigger>
          <TabsTrigger value='analytics'>Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value='overview' className='space-y-4 pr-36'>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Revenue YTD
                </CardTitle>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  className='h-4 w-4 text-muted-foreground'
                >
                  <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
                </svg>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{`${revenue.toLocaleString(
                  'en-US',
                  {
                    style: 'currency',
                    currency: 'USD',
                  }
                )}`}</div>
                <p className='text-xs text-muted-foreground'>
                  +{`${yearrevenuegrowth}`}% from last year
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Revenue MTD
                </CardTitle>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  className='h-4 w-4 text-muted-foreground'
                >
                  <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
                  <circle cx='9' cy='7' r='4' />
                  <path d='M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' />
                </svg>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{`${monthrevenue.toLocaleString(
                  'en-US',
                  {
                    style: 'currency',
                    currency: 'USD',
                  }
                )}`}</div>
                <p className='text-xs text-muted-foreground'>
                  +{`${monthrevenuegrowth}`}% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  # of Outstanding Invoices
                </CardTitle>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  className='h-4 w-4 text-muted-foreground'
                >
                  <rect width='20' height='14' x='2' y='5' rx='2' />
                  <path d='M2 10h20' />
                </svg>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>
                  {`${outstandingInvoices}`}
                </div>
        
              </CardContent>
            </Card>
          </div>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
            <Card className='col-span-4'>
              <CardHeader>
                <CardTitle>{`Overview of ${currentYear}`}</CardTitle>
              </CardHeader>
              <CardContent className='pl-2'>
                <Overview data={mappedData} />
              </CardContent>
            </Card>
            <Card className='col-span-3'>
              <CardHeader>
                <CardTitle>Recent Payments</CardTitle>
                <CardDescription>
                  There have been {payments.length} recent payments.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentSales payments={payments} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value='analytics' className='pr-36'>
          <DataTable columns={columns} data={data} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AdminDashboardPage;
