import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = async () => {
  return (
    <nav className='flex h-[64px] w-full items-center justify-between border border-b border-neutral-700 bg-black/50 px-16 py-4'>
      <div className='sticky top-0 flex w-full items-center justify-between text-neutral-400'>
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
      </div>
    </nav>
  );
};

export default Navbar;
