import { AdminAuth } from '@/components/AdminAuth';
import ParticleEffect from '@/components/ParticleEffect';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function SignInPage() {
  return (
    <div className='relative h-full w-full flex-col items-center justify-center lg:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <div className='relative hidden h-full flex-col bg-black p-10 text-white dark:border-r lg:flex'>
        <ParticleEffect />
        <div className='absolute left-10 top-10 z-20'>
          <Link href='/'>
            <Image
              src='/logo.png'
              alt='PayStream logo'
              width={240}
              height={25}
              quality={95}
              priority={true}
              className='w-auto object-contain'
            />
          </Link>
        </div>
        <div className='relative z-20 mt-auto'>
          <blockquote className='space-y-2'>
            <p className='text-lg'>
              &ldquo;PayStream: Where your payments journey begins, and
              financial adventures never feel like a quest.&rdquo;
            </p>
            <footer className='text-sm'>Bobby Tables</footer>
          </blockquote>
        </div>
      </div>
      <div className='z-20 flex h-full w-full flex-col items-center justify-center bg-black lg:bg-neutral-900 lg:p-8'>
        <div className='flex -translate-y-[80px] items-center justify-center lg:hidden'>
          <Link href='/'>
            <Image
              src='/logo.png'
              alt='PayStream logo'
              width={240}
              height={25}
              quality={95}
              priority={true}
              className='h-[60px] w-auto object-contain'
            />
          </Link>
        </div>
        <div className='flex w-[400px] flex-col space-y-6 rounded-lg border border-neutral-700 bg-neutral-800 p-12'>
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
