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

import type {
  ValueType,
  NameType,
} from 'recharts/types/component/DefaultTooltipContent';

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

type OverviewProps = {
  data: {
    month: string;
    revenue: number;
  }[];
};

const Overview = ({ data }: OverviewProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [data]);

  return !isLoading ? (
    <ResponsiveContainer width='100%' height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey='month'
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
        <Bar dataKey='revenue' fill='#EA580C' radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  ) : (
    <div className='flex h-[350px] items-center justify-center'>
      <div
        className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-400 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
        role='status'
      >
        <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
          Loading...
        </span>
      </div>
    </div>
  );
};

export default Overview;
