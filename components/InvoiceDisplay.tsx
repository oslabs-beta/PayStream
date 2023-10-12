import React from "react";
import { StripeContainer } from "../bill-bot-baggins/components";

export default function InvoiceDisplay() {
  return (
    <main className="flex h-full w-full flex-col items-center justify-center space-y-4">
      <h1 className="flex w-1/2 items-start text-2xl font-bold">Invoice</h1>
      <section className="flex w-1/2 flex-col space-y-8 rounded-lg bg-black/80 p-10 text-white/80">
        <StripeContainer />
      </section>
    </main>
  );
}
