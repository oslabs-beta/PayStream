import axios from "axios";
import { NextResponse } from "next/server";
import React, { useEffect, useState } from "react";

// declaring an interface to reassign AxiosResponse implicit "any" return to acess array properties
interface ServerResponse {
  data: ServerData;
}

interface ServerData {
  node: string[];
}

// payment display/record component
const PaymentRecord = () => {
  let fetchedData;
  const invoiceData = async (): Promise<ServerResponse> => {
    const response = await axios.request<ServerResponse>({
      url: "api/salesforce",
      method: "post",
    });
    // map the data to properties for relevant records
    const { data } = response;
    console.log(data);
    return data;
  };

  // put axios request inside of useEffect hook and have "newData" update state
  // const payments = invoiceData();
  // console.log(payments);

  // map payments info to props and then make individual payment record components

  return (
    <>
    <div className='flex h-screen w-screen items-center'>
      <div className='w-full text-center'>
      <button onClick={invoiceData}>Pay Invoice</button>
      </div>
      </div>
    </>
  );
};

export default PaymentRecord;
