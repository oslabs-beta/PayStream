'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CustButton from './CustButton';
import { useRouter } from 'next/router';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Button } from '@radix-ui/themes';

const Navbar = () => {
  const { data: session } = useSession();
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
    <header className='sticky w-full'>
      <nav className='mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 sm:px-16'>
        <Image
          src='/logo.png'
          alt='Billbot Baggins logo'
          width={500}
          height={85}
          quality={95}
          className='object-contain'
        />

        <Link href='/ClientDashboard'>
          <CustButton
            title='Dashboard'
            btnType='button'
            // containerStyles=''
          />
        </Link>

        <Link href='/'>
          <CustButton
            title='Previous Payments'
            btnType='button'
            // containerStyles=''
          />
        </Link>

        <Link href='/'>
          <CustButton
            title='Upcoming Payments'
            btnType='button'
            // containerStyles=''
          />
        </Link>

        {session ? (
          <Button onClick={() => signOut()}>Logout</Button>
        ) : (
          <Button onClick={() => signIn()}>Login</Button>
        )}

        {/* <button onClick={logout}><CustButton
        title='Logout'
        btnType='button'
        containerStyles=''
      /></button> */}
      </nav>
    </header>
  );
};

export default Navbar;
