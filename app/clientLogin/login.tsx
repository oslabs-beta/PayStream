"use client"
import { signIn } from "next-auth/react";
import React, { useState } from 'react';
import Link from "next/link";
import { Text, Heading } from "@radix-ui/themes";


export const ClientLogin: React.FC = () => {
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
    <div>
      <h1>Welcome to BillBot Baggins</h1>
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

//export default ClientLogin;