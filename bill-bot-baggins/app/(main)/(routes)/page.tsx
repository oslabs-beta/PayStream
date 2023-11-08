import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
async function Home() {
  return (
    <div className='container relative h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <div className='text-grey relative hidden h-full flex-col bg-muted p-10 dark:border-r lg:flex'>
        <div className='absolute inset-0 bg-[url("/markus-winkler-payment.jpg")] bg-cover bg-center opacity-80' />
        <div className='relative z-20 flex items-center text-lg font-medium'>
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
        <div className='relative z-20 mt-auto'>
          <blockquote className='space-y-2'>
            <p>OUR NAMES</p>
            <footer className='text-sm'>PLTG</footer>
          </blockquote>
        </div>
      </div>
      <div className='flex h-full items-center justify-center bg-neutral-900 lg:p-8'>
        <div className='flex flex-col space-x-4 space-y-2'>
          <p className='mx-8 my-8 text-lg'>
            PayStream provides real-time payment updates allowing our client to
            make well-informed business decisions based on their cash-flow
            metrics.
          </p>
          <div className='bg-emerald-900/33 rounded-lg border-8 border-solid border-emerald-900'>
            <p className='bg-emerald-900 text-center align-top text-2xl font-light italic tracking-widest '>
              When your payment journey begins with PayStream, financial
              adventures never feel like a quest
            </p>
          </div>
          <div className=''>
            <p className='mx-8 my-8 text-lg'>
              If you are interested in working with PLTG for custom financial
              solutions for your business please contact
              paystreamdevops@gmail.com
            </p>
            <div className=''>
              <p className='mx-8 my-8 text-lg'>
                If you are a developer interested in contributing to this
                project, please visit [GITHUB LINK]
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
