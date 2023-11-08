'use client';

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SearchFilter } from '@/components/SearchFilter';
import { PaymentProps } from '@/lib/types';

export function PaidInvoices({ data }: { data: PaymentProps[] }) {
  // const fetcher = async (url: string, options?: RequestInit): Promise<any> => {
  //   const response = await fetch(url, options);
  //   const data = await response.json();
  // };
  const [invoice_ID, setInvoice_ID] = useState('');
  const [accountName, setAccountName] = useState('');
  const [filteredData, setFilteredData] = useState<PaymentProps[]>(data);

  const searchFunction = () => {
    let dataArray;
    if (invoice_ID !== '') {
      dataArray = SearchFilter(data, invoice_ID, 'invoice_id', '');
    }
    if (accountName !== '') {
      dataArray = SearchFilter(
        dataArray || data,
        accountName,
        'account_name',
        ''
      );
    }
    if (dataArray !== undefined) {
      setFilteredData(dataArray);
    }
  };

  return (
    <Table>
      <TableCaption>Sent Invoices</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>Invoice ID</TableHead>
          <TableHead>Client</TableHead>
          <TableHead>Project</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Invoice Sent Date</TableHead>
          <TableHead>Invoice Due Date</TableHead>
          <TableHead>Payment Date</TableHead>
          <TableHead>Payment Method</TableHead>
        </TableRow>
        <TableRow>
          <div className='flex w-full space-x-4'>
            <Input
              type='text'
              placeholder='Search by Invoice ID...'
              value={invoice_ID}
              onChange={(e) => setInvoice_ID(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  searchFunction();
                }
              }}
            />
            <Button onClick={() => setFilteredData(data)}>Clear</Button>

            <Input
              type='text'
              placeholder='Search by Account Name...'
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  searchFunction();
                }
              }}
            />
          </div>

          {/* <input
      type="text"
      placeholder="Search by Project Name..."
      value={projectName}
      onChange={(e) => setProjectName(e.target.value)}
      onKeyPress={(e) => {
        if (e.key === 'Enter') {
          // Search handler
        }
      }}
    /> */}
        </TableRow>
        {/* <TableRow>
            <SearchFilter searchTerm={searchTerm} onSearchChange={handleSearchChange}></SearchFilter>
          </TableRow> */}
      </TableHeader>
      <TableBody>
        {filteredData.map((opportunity) => (
          <TableRow key={opportunity.invoice_id}>
            <TableCell className='font-medium'>
              {opportunity.invoice_id}
            </TableCell>
            <TableCell>{opportunity.account_name}</TableCell>
            <TableCell>{opportunity.project_name}</TableCell>
            <TableCell>{opportunity.amount}</TableCell>
            <TableCell>{opportunity.invoice_sent_date}</TableCell>
            <TableCell>{opportunity.invoice_due_date}</TableCell>
            <TableCell>{opportunity.payment_date}</TableCell>
            <TableCell>{opportunity.payment_method}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
