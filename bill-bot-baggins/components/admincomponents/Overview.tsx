'use client';

import React, { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const Overview = () => {
  const [invoiceData, setInvoiceData] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  useEffect(() => {
    const getSalesForceData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('/api/salesforce-GraphQL', {
          method: 'POST',
        });

        const result = await res.json();

        // creates a map to hold every month's data
        const revenueByMonth = new Map();

        // loop through each month and set each month (ex 'Jan') on the Map and its revenue data to 0
        for (const month of monthNames) {
          revenueByMonth.set(month, 0);
        }

        // loop through the resulting data from the SF graphQL and add its data to the specific month
        result.forEach(
          (invoice: { invoice_due_date: string; amount: number }) => {
            const { invoice_due_date, amount } = invoice;
            const month = getMonthNameFromDueDate(invoice_due_date);
            const currentRevenue = revenueByMonth.get(month) || 0;
            revenueByMonth.set(month, currentRevenue + amount);
          }
        );

        // convert the map to an array
        const mappedData = Array.from(revenueByMonth, ([name, revenue]) => ({
          name,
          revenue,
        }));

        // set the invoice data with the mappedData
        setInvoiceData(mappedData);
        setIsLoading(false);
        console.log(mappedData);
      } catch (err) {
        console.log('This is an error in overview: ', err);
      }
    };

    // helper function to get the month (ex. 'Jan') from the date we get from SF ('2023-10-19')
    const getMonthNameFromDueDate = (due_date: string) => {
      const date = new Date(due_date);
      return monthNames[date.getMonth()];
    };

    getSalesForceData();
  }, []);

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
        <Tooltip />
        <Bar dataKey='revenue' fill='#e69d17' radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  ) : (
    <div className='flex h-[350px] items-center justify-center'>Loading...</div>
  );
};

export default Overview;