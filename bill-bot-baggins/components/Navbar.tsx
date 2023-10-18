'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import CustButton from './CustButton';
import { useUser } from '@clerk/nextjs';
import Profile from './Profile';

const Navbar = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  return (
    <nav className='flex h-[64px] w-full items-center justify-between border border-b border-neutral-700 bg-black/50 px-16 py-4'>
      <header className='sticky top-0 flex w-full items-center justify-between text-neutral-400'>
        <Link href='/'>
          <Image
            src='/logo.png'
            alt='Billbot Baggins logo'
            width={240}
            height={25}
            quality={95}
            className='w-auto object-contain xl:pl-28'
            priority={true}
          />
        </Link>
        {user ? (
          // <>
          //   <Link
          //     className='rounded-lg p-2 hover:bg-neutral-800 hover:text-neutral-300'
          //     href='/clientDashboard'
          //   >
          //     <CustButton
          //       title='Dashboard'
          //       btnType='button'
          //       // containerStyles=''
          //     />
          //   </Link>

          //   <Link
          //     className='rounded-lg p-2 hover:bg-neutral-800 hover:text-neutral-300'
          //     href='/'
          //   >
          //     <CustButton
          //       title='Previous Payments'
          //       btnType='button'
          //       // containerStyles=''
          //     />
          //   </Link>

          //   <Link
          //     className='rounded-lg p-2 hover:bg-neutral-800 hover:text-neutral-300'
          //     href='/'
          //   >
          //     <CustButton
          //       title='Upcoming Payments'
          //       btnType='button'
          //       // containerStyles=''
          //     />
          //   </Link>
          <Profile />
        ) : // {/* </>
        null}
      </header>
    </nav>
  );
};

export default Navbar;
