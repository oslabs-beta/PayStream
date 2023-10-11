import React from 'react';
import { cn } from '@/lib/utils';

type InvoiceSectionProps = {
  title: string;
  invoiceData: string | number | null;
  variant?: boolean;
};

function InvoiceSection({ title, invoiceData, variant }: InvoiceSectionProps) {
  return (
    <div className={cn('space-y-2', variant && 'flex flex-col items-center')}>
      <h3 className='text-xs'>{title}</h3>
      <p className='font-bold'>{invoiceData}</p>
    </div>
  );
}

export default InvoiceSection;
