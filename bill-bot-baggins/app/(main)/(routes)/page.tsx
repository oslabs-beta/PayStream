import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
async function Home() {
  return (
    <div className='container relative h-full flex-col items-center justify-center md:grid lg:max-w-none  lg:grid-cols-2 lg:px-0'>
      <div className='absolute inset-0 bg-[url("/ales-nesetril-background.jpg")] bg-cover bg-center' />
      <div className='relative hidden h-full max-w-2xl flex-col p-10 lg:flex'>
        <div className='sm:text-top relative z-20 flex items-center text-lg font-medium'>
          <Link href='/'>
            <Image
              src='/logo.png'
              alt='Billbot Baggins logo'
              width={240}
              height={25}
              quality={95}
              className='w-auto object-contain'
            />
          </Link>
        </div>
        <div className='text-slate-25 pt-10 text-6xl'>
          <p>Real-time updates,</p>
          <p>Well-informed decisions</p>
        </div>
        <div>
          <p className='mt-6 text-lg '>
            PayStream provides real-time payment updates allowing our client to
            make well-informed business decisions based on their cash-flow
            metrics.
          </p>
        </div>
        {/* <div className='relative z-20 mt-auto'>
          <blockquote className='space-y-2'>
            <p>OUR NAMES</p>
            <footer className='text-sm'>PLTG</footer>
          </blockquote>
        </div> */}
      </div>
      {/* <div className='flex h-full items-center justify-center bg-neutral-100 lg:p-8'>
        <div className='flex flex-col space-x-4 space-y-2'>
          <div className='rounded-lg border-8 border-solid border-emerald-900 bg-emerald-800/25'>
            <p className='bg-emerald-900 text-center align-top text-2xl font-light italic tracking-widest '>
              Learn more about the power of PayStream
            </p>
          </div>

          <p className='mx-8 my-8 text-lg'>
            If you are interested in working with PLTG for custom financial
            solutions for your business please contact paystreamdevops@gmail.com
          </p>

          <p className='mx-8 my-8 text-lg'>
            If you are a developer interested in contributing to this project,
            please visit the{' '}
            <Link href='https://github.com/oslabs-beta/PayStream'>
              PayStream GitHub repo
            </Link>
            .
          </p>
        </div>
      </div> */}
    </div>
  );
}

export default Home;
