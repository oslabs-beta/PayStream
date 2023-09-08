"use client";
import React from 'react';
import Link from "next/link";
import Image from "next/image";
import CustButton from "./CustButton";
import {useRouter} from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {
    // const router = useRouter();
    // const {pathname} = router;
    // async function logout() {
    //   await router.push('/');
    //   await signOut();
    // }

    // const { data: session } = useSession();
    // if (!session) {
    //     return;
    // }
  return (
    <header className='w-full sticky'>
    <nav className='max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4'>
        <Image
        src='/logo.png' 
        alt='Billbot Baggins logo' 
        width={500}
        height={85}
        className='object-contain'
        />

        <Link href="/ClientDashboard"><CustButton
        title='Dashboard'
        btnType='button'
        // containerStyles=''
      />
        </Link>

        <Link href="/"><CustButton
        title='Previous Payments'
        btnType='button'
        // containerStyles=''
      />
        </Link>

        <Link href="/"><CustButton
        title='Upcoming Payments'
        btnType='button'
        // containerStyles=''
      />
        </Link>

      <Link href="/clientLogin"><CustButton
        title='Login'
        btnType='button'
        // containerStyles=''
      /></Link>

{/* <button onClick={logout}><CustButton
        title='Logout'
        btnType='button'
        containerStyles=''
      /></button> */}
    </nav>
  </header>
  )
}

export default Navbar