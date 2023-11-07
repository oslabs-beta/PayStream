'use client';
import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { Button } from '@/components/ui/button';
import useSWR from 'swr';
import { SearchFilter } from '@/components/SearchFilter';
import { PaymentProps, SearchProps, DataArray } from "@/lib/types";
import { Input } from "@/components/ui/input";
//import { getSalesForceAccessToken, getSalesForceInvoiceData } from '@/lib/utils';

   
  export function PaidInvoices(props: any) {
    // const fetcher = async (url: string, options?: RequestInit): Promise<any> => {
    //   const response = await fetch(url, options);
    //   const data = await response.json();
    // };
    const [invoice_ID, setInvoice_ID] = useState('');
    const [accountName, setAccountName] = useState('');
    const [filteredData, setFilteredData] = useState<DataArray>([]);
    // const { data, isLoading, error } = useSWR(
    //   '/api/salesforce-GraphQL',
    //   (url: string) => fetcher(url, { method: 'POST' })
    // );
    useEffect(() => {setFilteredData(props.data)}, [props.data]);
  //   const res = await fetch('http://localhost:3000/api/salesforce-GraphQL', {
  //     method: 'POST',
  // });
  // const data: PaymentProps[] = await res.json();

    // if (error) {
    //   console.log(error);
    //   return <div>Something went wrong...</div>;
      
    // }
//console.log(data);
    
const searchFunction = () => {
  let dataArray;
  if (invoice_ID !== '') {
    dataArray = SearchFilter(props.data, invoice_ID, 'invoice_id', '');
  }
  if (accountName !== '') {
    dataArray = SearchFilter(dataArray || props.data, accountName, 'account_name', '');
  }  
  if (dataArray !== undefined) {
    setFilteredData(dataArray); 
  }
} 

    return (
      <Table>
        <TableCaption>Sent Invoices</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice ID</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Invoice Sent Date</TableHead>
            <TableHead>Invoice Due Date</TableHead>
            <TableHead>Payment Date</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>Stripe ID</TableHead>
          </TableRow>
          <TableRow>
          <input
      type="text"
      placeholder="Search by Invoice ID..."
      value={invoice_ID}
      onChange={(e) => setInvoice_ID(e.target.value)}
      onKeyPress={(e) => {
        if (e.key === 'Enter') {
          searchFunction();
        }
      }}
    />
    <Button onClick={() => setFilteredData(props.data)}>Clear</Button>

<input
      type="text"
      placeholder="Search by Account Name..."
      value={accountName}
      onChange={(e) => setAccountName(e.target.value)}
      onKeyPress={(e) => {
        if (e.key === 'Enter') {
          searchFunction();
        }
      }}
    />

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
            
          {filteredData.map((datas) => (
            <TableRow key={datas.invoice_id}>
              <TableCell className="font-medium">{datas.invoice_id}</TableCell>
              <TableCell>{datas.account_name}</TableCell>
              <TableCell>{datas.project_name}</TableCell>
              <TableCell>{datas.amount}</TableCell>
              <TableCell>{datas.invoice_sent_date}</TableCell>
              <TableCell>{datas.invoice_due_date}</TableCell>              
              <TableCell>{datas.payment_date}</TableCell>
              <TableCell>{datas.payment_method}</TableCell>
              {/* <TableCell className="text-right">{datas.stripe_invoice_id}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }