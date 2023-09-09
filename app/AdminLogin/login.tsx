"use client"
import { signIn } from "next-auth/react";
import React, { useState } from 'react';
import Link from "next/link";
import { Text, Heading } from "@radix-ui/themes";
//import { Form } from "@radix-ui/react-form";


export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // login, auth, etc code here

  };

  return (
    <div className="bg-bgGray w-screen h-screen flex justify-center">
      <Heading>Welcome to BillBot Baggins</Heading>
     
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Login</button>
        <div>
          <Link href="clientRegister">Register</Link> / <Link href="">Forgot Password?</Link>
        </div>
      </form>
     
    </div>
  );
};
