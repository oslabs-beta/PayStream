"use client";

import PaymentsDisplay from "./payments/page";
import React from "react";
import StripeContainer from "../components/StripeContainer";

export default function Home() {
  return (
    <>
      <main className="class">
        {/* conditionally render Payments display */}
        {/* Added "paymentsdisplay" in anticipation of component - button is in here to make API call, you can move this wherever */}
        <PaymentsDisplay />
        <StripeContainer />
      </main>
    </>
  );
}
