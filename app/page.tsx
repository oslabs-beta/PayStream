"use client";
import PaymentsDisplay from "./payments/page";
import React from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import {
  Container,
  Flex,
  Button,
  Heading,
  Text,
  Card,
  Badge,
} from "@radix-ui/themes";
import StripeContainer from "../components/StripeContainer";
import { Navbar } from "@/components";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className="bg-bgGray w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <div className="flex flex-col gap-8">
            <Heading>Welcome to Bill Bot Baggins</Heading>
            <div className="flex flex-row gap-4 items-center justify-center">
              <Link href="/clientLogin">
                <Button>Client Login</Button>
              </Link>
              <Link href="/AdminLogin">
                <Button>Admin Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <main className="class">
        <Navbar />
        {/* conditionally render Payments display */}
        {/* Added "paymentsdisplay" in anticipation of component - button is in here to make API call, you can move this wherever */}
        {/* <PaymentsDisplay /> */}
        <StripeContainer />
        {/* <button onClick={newData}>bill-bot</button> */}
        <>
          <Link href="/clientLogin">
            <Button>
              <Text color="gray">Clients Login</Text>
            </Button>
          </Link>
          <Link href="/AdminLogin">
            <Button>
              <Text color="gray">Admin Login</Text>
            </Button>
          </Link>
        </>
      </main>
    </>
  );
}
