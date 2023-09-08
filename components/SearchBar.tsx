"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import SearchTool from "./SearchTool";

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
  <button type='submit' className={`-ml-3 z-10}`}>Search
  </button>
);

const SearchBar = () => {
  const [invoice_ID, setInvoice_ID] = useState("");
  const [model, setModel] = useState("");

  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (invoice_ID.trim() === "" && model.trim() === "") {
      return alert("Please provide some input");
    }

    updateSearchParams(model.toLowerCase(), invoice_ID.toLowerCase());
  };

  const updateSearchParams = (model: string, invoice_ID: string) => {
    // Create a new URLSearchParams object using the current URL search parameters
    const searchParams = new URLSearchParams(window.location.search);

    // Update or delete the 'model' search parameter based on the 'model' value
    if (model) {
      searchParams.set("model", model);
    } else {
      searchParams.delete("model");
    }

    // Update or delete the 'manufacturer' search parameter based on the 'manufacturer' value
    if (invoice_ID) {
      searchParams.set("invoice_ID", invoice_ID);
    } else {
       searchParams.delete("invoice_ID");
    }

    // Generate the new pathname with the updated search parameters
    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

    router.push(newPathname);
  };

  return (
    <form className='searchbar' onSubmit={handleSearch}>
      <div className='searchbar__item'>
        <SearchTool
          invoice_ID={invoice_ID}
          setInvoice_ID={setInvoice_ID}
        />
        <SearchButton otherClasses='sm:hidden' />
      </div>
      <div className='searchbar__item'>

        <input
          type='text'
          name='model'
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder='...'
          className='searchbar__input'
        />
        <SearchButton otherClasses='sm:hidden' />
      </div>
      <SearchButton otherClasses='max-sm:hidden' />
    </form>
  );
};

// account_name: string;
// payment_method: string;
// payment_type: string; //future vs current payments
// invoice_sent_date: string;
// payment_date: string;
// amount: number;
// invoice_number: string;
// invoice_due_date: string;//due 14 days from invoice date

export default SearchBar;