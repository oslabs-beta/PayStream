import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Overview, RecentSales, columns, DataTable } from '@/components/index';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getRevenueData } from '@/lib/utils';
import { getSalesForceAccessToken, getSalesForceInvoiceData } from '@/lib/api';

async function AdminDashboardPage() {
  const currentYear = new Date().getFullYear().toString();
  // get SF accessToken
  const accessToken = await getSalesForceAccessToken();
  // get SF invoice data using accessToken
  const data = await getSalesForceInvoiceData(accessToken);
  // get formatted revenue data
  const revenueData = getRevenueData(data);

  const {
    payments,
    monthRevenue,
    yearRevenue,
    outstandingInvoices,
    revenueDataByMonth,
    monthRevenueGrowth,
    yearRevenueGrowth,
  } = revenueData;

  return (
    <div className='aspect-auto h-full flex-1 space-y-4 px-5 pt-4 xl:h-5/6 xl:pl-36'>
      <div className='flex items-center justify-between space-y-2'>
        <h2 className='text-3xl font-bold tracking-tight'>Dashboard</h2>
        <div className='flex items-center space-x-2'></div>
      </div>
      <Tabs defaultValue='overview' className='space-y-4'>
        <TabsList>
          <TabsTrigger value='overview'>Overview</TabsTrigger>
          <TabsTrigger value='analytics'>Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value='overview' className='space-y-4 xl:pr-36'>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
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
                <div className='text-2xl font-bold'>{`${yearRevenue.toLocaleString(
                  'en-US',
                  {
                    style: 'currency',
                    currency: 'USD',
                  }
                )}`}</div>
                <p className='text-xs text-muted-foreground'>
                  {yearRevenueGrowth >= 0 && '+'}
                  {`${yearRevenueGrowth}`}% from last year
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
                  <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
                </svg>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{`${monthRevenue.toLocaleString(
                  'en-US',
                  {
                    style: 'currency',
                    currency: 'USD',
                  }
                )}`}</div>
                <p className='text-xs text-muted-foreground'>
                  {monthRevenueGrowth >= 0 && '+'}
                  {`${monthRevenueGrowth}% from last month`}
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
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5'>
            <Card className='col-span-2 lg:col-span-3'>
              <CardHeader>
                <CardTitle>{`Overview of ${currentYear}`}</CardTitle>
              </CardHeader>
              <CardContent className='pl-2'>
                {revenueDataByMonth ? (
                  <Overview data={revenueDataByMonth} />
                ) : (
                  <div className='flex h-[300px] items-center justify-center'>
                    Error fetching data...
                  </div>
                )}
              </CardContent>
            </Card>
            <Card className='col-span-2 lg:col-span-2'>
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
        <TabsContent value='analytics' className='xl:pr-36'>
          {data ? (
            <DataTable columns={columns} data={data} />
          ) : (
            <div className='flex h-full items-center justify-center'>
              Error fetching data...
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AdminDashboardPage;
