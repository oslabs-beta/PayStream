"use client";
import axios from "axios";
import { redisConnect } from "../lib/redis";
<<<<<<< HEAD
import PaymentsDisplay from "./payments/PaymentsDisplay";;
import React from "react";
import StripeContainer from '../components/StripeContainer';
=======
import PaymentsDisplay from "./payments/page";
>>>>>>> cc/redis-salesforce-connect

export default function Home() {
  return (
    <>
      <main className="class">
        {/* conditionally render Payments display */}
        {/* Added "paymentsdisplay" in anticipation of component - button is in here to make API call, you can move this wherever */}
        <PaymentsDisplay />
        <StripeContainer/>
    </main>
    </>
  );
}
