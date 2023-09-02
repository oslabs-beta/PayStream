import axios from "axios";
// import { NextResponse } from "next/server";z
import React, { useEffect, useState } from "react";
import { ServerResponse } from "../interfaces";

// payment display/record component
const PaymentRecord = () => {
  // define variablwe to give us access to this data betwen API calls
  let sfInvoiceData: ServerResponse | undefined;
  const fetchInvoiceData = async (): Promise<ServerResponse> => {
    const { data } = await axios.request<ServerResponse>({
      url: "api/salesforce",
      method: "post",
    });
    console.log(data);
    sfInvoiceData = data;

    return sfInvoiceData;
  };

  console.log(sfInvoiceData);

  const redisConnect = async (): Promise<ServerResponse> => {
    const { data } = await axios.request<ServerResponse>({
      url: "/api/redis",
      method: "post",
      data: {
        sfInvoiceData: sfInvoiceData,
      },
    });

    console.log(data);
    return data;
  };

  // webhook function placeholder below
  // const webhook = async (): Promise<ServerResponse> => {};

  // put axios request inside of useEffect hook and have "newData" update state
  // const payments = invoiceData();
  // console.log(payments);

  return (
    <div className="max-w-sm w-full lg:max-w-full lg:flex">
      <button
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        onClick={fetchInvoiceData}
      >
        bill-bot-baggins x salesforce route
      </button>

      <button
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        onClick={redisConnect}
      >
        bill-bot-baggins x redis
      </button>

      {/* <button onClick={webhook}>bill-bot-baggins x webhook ???</button> */}
    </div>
  );
};

export default PaymentRecord;
