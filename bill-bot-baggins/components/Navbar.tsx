import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import CustButton from './CustButton';
import { UserButton } from '@clerk/nextjs';
import { useUser } from '@clerk/nextjs';
import { Button } from '@radix-ui/themes';

const Navbar = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  return (
    <nav className='flex w-full items-center justify-between border border-x-0 border-t-0 border-neutral-700 bg-black/50 px-16 py-4'>
      <header className='sticky top-0 flex w-full items-center justify-between text-neutral-400'>
        <Link href='/'>
          <Image
            src='/logo.png'
            alt='Billbot Baggins logo'
            width={500}
            height={85}
            quality={95}
            className='object-contain'
            priority={true}
          />
        </Link>
        {user ? (
          <>
            <Link
              className='rounded-lg p-2 hover:bg-neutral-800 hover:text-neutral-300'
              href='/clientDashboard'
            >
              <CustButton
                title='Dashboard'
                btnType='button'
                // containerStyles=''
              />
            </Link>

            <Link
              className='rounded-lg p-2 hover:bg-neutral-800 hover:text-neutral-300'
              href='/'
            >
              <CustButton
                title='Previous Payments'
                btnType='button'
                // containerStyles=''
              />
            </Link>

            <Link
              className='rounded-lg p-2 hover:bg-neutral-800 hover:text-neutral-300'
              href='/'
            >
              <CustButton
                title='Upcoming Payments'
                btnType='button'
                // containerStyles=''
              />
            </Link>
            <div className='flex items-center space-x-2 text-white/90'>
              <UserButton afterSignOutUrl='/invoice' />
            </div>
          </>
        ) : (
          <Link
            href='/sign-in'
            className='transition-all hover:scale-105 active:scale-100'
          >
            <Button size='3' variant='outline'>
              Login
            </Button>
          </Link>
        )}
      </header>
    </nav>
  );
};

export default Navbar;
