'use client';

import React, { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from 'recharts';
import useSWR from 'swr';
import {
  ValueType,
  NameType,
} from 'recharts/types/component/DefaultTooltipContent';
import { monthNames, getMonthNameFromDueDate, fetcher } from '@/lib/utils';

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className='rounded-md bg-neutral-600 p-2 text-orange-400'>
        <p className='font-bold'>{`Revenue`}</p>
        <p className=''>{`${label}: ${payload[0].value?.toLocaleString(
          'en-US',
          {
            style: 'currency',
            currency: 'USD',
          }
        )}`}</p>
      </div>
    );
  }

  return null;
};

const Overview = () => {
  const [invoiceData, setInvoiceData] = useState<any[] | null>(null);
  // using SWR here to get back data, isLoading, and error state
  const { data, isLoading, error } = useSWR(
    '/api/salesforce-GraphQL',
    (url: string) => fetcher(url, { method: 'POST' })
  );

  // Should probably change this to handle errors more gracefully
  if (error) {
    console.log(error);
    return <div>Something went wrong...</div>;
  }

  const formatSalesForceData = () => {
    // creates a map to hold every month's data
    const revenueByMonth = new Map();

    // loop through each month and set each month (ex 'Jan') on the Map and its revenue data to 0
    for (const month of monthNames) {
      revenueByMonth.set(month, 0);
    }

    // loop through the resulting data from the SF graphQL and add its data to the specific month
    data.forEach((invoice: { invoice_due_date: string; amount: number }) => {
      const { invoice_due_date, amount } = invoice;
      const month = getMonthNameFromDueDate(invoice_due_date);
      const currentRevenue = revenueByMonth.get(month) || 0;
      revenueByMonth.set(month, currentRevenue + amount);
    });

    // convert the map to an array
    const mappedData = Array.from(revenueByMonth, ([name, revenue]) => ({
      name,
      revenue,
    }));

    // set the invoice data with the mappedData
    setInvoiceData(mappedData);
  };

  useEffect(() => {
    if (data) {
      formatSalesForceData();
    }
  }, [data]);

  return !isLoading ? (
    <ResponsiveContainer width='100%' height={350}>
      <BarChart data={invoiceData as {}[]}>
        <XAxis
          dataKey='name'
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey='revenue' fill='#e69d17' radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  ) : (
    <div className='flex h-[350px] items-center justify-center'>Loading...</div>
  );
};

export default Overview;
