"use client"
import axios from "axios"
import React from "react"
import { redisConnect } from "../lib/redis"
import PaymentsDisplay from "./components/payments/PaymentsDisplay"

export default function Home() {
  return (
		<>
    <main className="class">
			{/* conditionally render Payments display */}
      <PaymentsDisplay />
    </main>
		</>
  )
}
