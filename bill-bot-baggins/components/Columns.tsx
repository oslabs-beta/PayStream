'use client';

import { ColumnDef } from '@tanstack/react-table';
import { PaymentProps } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ArrowDown, ArrowUp, ArrowUpDown, MoreHorizontal } from 'lucide-react';
import toast from 'react-hot-toast';

export const columns: ColumnDef<PaymentProps>[] = [
  {
    accessorKey: 'invoice_id',
    header: ({ column }) => {
      return (
        <Button variant={'ghost'} onClick={() => column.toggleSorting()}>
          Invoice ID
          {column.getIsSorted() === 'asc' ? (
            <ArrowUp className='h-4 w-4' />
          ) : column.getIsSorted() === 'desc' ? (
            <ArrowDown className='h-4 w-4' />
          ) : null}
        </Button>
      );
    },
  },
  {
    accessorKey: 'account_name',
    header: ({ column }) => {
      return (
        <Button variant={'ghost'} onClick={() => column.toggleSorting()}>
          Client
          {column.getIsSorted() === 'asc' ? (
            <ArrowUp className='h-4 w-4' />
          ) : column.getIsSorted() === 'desc' ? (
            <ArrowDown className='h-4 w-4' />
          ) : null}
        </Button>
      );
    },
  },
  {
    accessorKey: 'project_name',
    header: ({ column }) => {
      return (
        <Button variant={'ghost'} onClick={() => column.toggleSorting()}>
          Project
          {column.getIsSorted() === 'asc' ? (
            <ArrowUp className='h-4 w-4' />
          ) : column.getIsSorted() === 'desc' ? (
            <ArrowDown className='h-4 w-4' />
          ) : null}
        </Button>
      );
    },
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => {
      return (
        <Button variant={'ghost'} onClick={() => column.toggleSorting()}>
          Amount
          {column.getIsSorted() === 'asc' ? (
            <ArrowUp className='h-4 w-4' />
          ) : column.getIsSorted() === 'desc' ? (
            <ArrowDown className='h-4 w-4' />
          ) : null}
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);

      return <div className='text-right font-medium'>{formatted}</div>;
    },
  },
  {
    accessorKey: 'invoice_sent_date',
    header: ({ column }) => {
      return (
        <Button variant={'ghost'} onClick={() => column.toggleSorting()}>
          Invoice Sent Date
          {column.getIsSorted() === 'asc' ? (
            <ArrowUp className='h-4 w-4' />
          ) : column.getIsSorted() === 'desc' ? (
            <ArrowDown className='h-4 w-4' />
          ) : null}
        </Button>
      );
    },
  },
  {
    accessorKey: 'invoice_due_date',
    header: ({ column }) => {
      return (
        <Button variant={'ghost'} onClick={() => column.toggleSorting()}>
          Invoice Due Date
          {column.getIsSorted() === 'asc' ? (
            <ArrowUp className='h-4 w-4' />
          ) : column.getIsSorted() === 'desc' ? (
            <ArrowDown className='h-4 w-4' />
          ) : null}
        </Button>
      );
    },
  },
  {
    accessorKey: 'payment_date',
    header: ({ column }) => {
      return (
        <Button variant={'ghost'} onClick={() => column.toggleSorting()}>
          Payment Date
          {column.getIsSorted() === 'asc' ? (
            <ArrowUp className='h-4 w-4 text-green-500' />
          ) : column.getIsSorted() === 'desc' ? (
            <ArrowDown className='h-4 w-4 text-green-500' />
          ) : null}
        </Button>
      );
    },
  },
  {
    accessorKey: 'payment_method',
    header: ({ column }) => {
      return (
        <Button variant={'ghost'} onClick={() => column.toggleSorting()}>
          Payment Method
          {column.getIsSorted() === 'asc' ? (
            <ArrowUp className='h-4 w-4 text-green-500' />
          ) : column.getIsSorted() === 'desc' ? (
            <ArrowDown className='h-4 w-4 text-green-500' />
          ) : null}
        </Button>
      );
    },
  },
];
