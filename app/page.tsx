import Image from 'next/image';
import React from "react";
import StripeContainer from '@/components/StripeContainer';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Bill bot baggins
      <StripeContainer/>
    </main>
  )
}
