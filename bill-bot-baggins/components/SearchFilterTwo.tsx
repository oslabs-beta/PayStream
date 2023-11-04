'use client';

import React from 'react';
import useSWR from 'swr';
import { fetcher } from '@/lib/utils';
import { SearchProps } from "@/lib/types";
import { Input } from "@/components/ui/input";

const SearchFilterTwo = ({ invoice_ID, setInvoice_ID }: SearchProps) => {
  const [query, setQuery] = useState("");
  const [invoiceData, setInvoiceData] = useState<any[] | null>(null);
  const { data, isLoading, error } = useSWR(
    '/api/salesforce-GraphQL',
    (url: string) => fetcher(url, { method: 'POST' })
  );

  if (error) {
    console.log(error);
    return <div>Something went wrong...</div>;
    
  }

  const filtered =
    query === ""
      ? data
      : data.filter((item) =>
          item
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

// interface SearchFilterProps {
//   searchTerm: string;
//   onSearchChange: (term: string) => void;
// }

// const SearchFilter: React.FC<SearchFilterProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div>
       <Input type="text" placeholder="Search" value={item} className="pl-12 pr-4"  onChange={(e) => setQuery(e.target.value)}/>
    </div>
  );
};
// }
export default SearchFilterTwo;

