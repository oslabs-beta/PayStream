import { AdminAuth } from '@/components/AdminAuth';
import ParticleEffect from '@/components/ParticleEffect';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function SignInPage() {
  return (
    <div className='container relative h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
        <div className='absolute inset-0 bg-[url("/net.png")] bg-cover opacity-80'>
          <ParticleEffect />
        </div>
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
            <p className='text-lg'>
              &ldquo;BillBotBaggins: Where your payments journey begins, and
              financial adventures never feel like a quest.&rdquo;
            </p>
            <footer className='text-sm'>Bobby Tables</footer>
          </blockquote>
        </div>
      </div>
      <div className='flex h-full items-center justify-center bg-neutral-900 lg:p-8'>
        <div className='mx-auto flex w-full flex-col space-y-6 rounded-lg border border-neutral-700 bg-neutral-800 p-12 sm:w-[400px]'>
          <div className='flex flex-col space-y-2'>
            <h1 className='text-2xl font-semibold tracking-tight'>
              Admin Login
            </h1>
            <p className='text-sm text-muted-foreground'>
              Enter your credentials below to sign in
            </p>
          </div>
          <AdminAuth />
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
