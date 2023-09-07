"use client";
import axios from "axios";
import React from "react";
import { redisConnect } from "../lib/redis";
import PaymentsDisplay from "./payments/page";

export default function Home() {
  return (
    <>
      <main className="class">
        {/* conditionally render Payments display */}
        {/* Added "paymentsdisplay" in anticipation of component - button is in here to make API call, you can move this wherever */}
        <PaymentsDisplay />
      </main>
    </>
  );
}
