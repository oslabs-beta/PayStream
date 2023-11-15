import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Profile from './Profile';
import { auth } from '@clerk/nextjs';

const Navbar = async () => {
  const user = auth();
  return (
    <header className='sticky right-0 top-0 flex h-[64px] w-full items-center justify-between border border-b border-neutral-700 bg-black/50 px-16 py-4 backdrop-blur-md'>
      <div className='flex w-full items-center justify-between text-neutral-400'>
        <Link href='/'>
          <Image
            src='/logo.png'
            alt='Billbot Baggins logo'
            width={240}
            height={25}
            quality={95}
            className='w-auto object-contain xl:pl-[63px]'
            priority={true}
          />
        </Link>
      </div>
      {user ? <Profile /> : null}
    </header>
  );
};

export default Navbar;
