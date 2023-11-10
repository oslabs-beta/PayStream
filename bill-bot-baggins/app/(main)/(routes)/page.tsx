import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';
async function Home() {
  return (
    <div className='relative grid h-full flex-col  justify-center lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <div className='absolute inset-0 bg-[url("/ales-nesetril-background.jpg")] bg-cover bg-left' />
      <div className='container relative flex h-full max-w-2xl flex-col'>
        <div className='relative z-20 flex items-center pt-10 text-lg font-medium'>
          <Link href='/'>
            <Image
              src='/logo.png'
              alt='PayStream logo'
              width={400}
              height={40}
              // quality={10}
              className='relative flex justify-center'
            />
          </Link>
        </div>
        <div className='text-slate-25 pt-10 text-6xl'>
          <p>Real-time updates,</p>
          <p>Well-informed decisions</p>
        </div>
        <div>
          <p className='mb-5 mt-6 text-2xl'>
            PayStream provides real-time payment information so you can make
            well-informed business decisions based on your cash-flow metrics.
          </p>
          <div className=''>
            <footer className=''>
              <div>
                <p className='text-lg italic'>
                  PayStream is an Open Source product developed in collaboration
                  with OS Labs.
                </p>
                <Button className='my-3 mr-3 rounded-full bg-green-200 text-lg font-bold text-black hover:bg-green-200/90'>
                  <Link href='https://pay-stream-git-dev-pay-stream.vercel.app/admin'>
                    Experience PayStream
                  </Link>
                </Button>
                <Button className='text-md my-3 rounded-full border-2 border-green-200 bg-transparent p-4 text-green-200 hover:bg-green-200/90 hover:text-black'>
                  <Link href='https://github.com/oslabs-beta/PayStream'>
                    Learn more
                  </Link>
                </Button>
              </div>
            </footer>
          </div>
          <div className='absolute bottom-10 '>
            <h1 className='pb-4 text-3xl font-semibold tracking-tight'>
              Meet the <span className='tracking-wider'>T e a m</span>
            </h1>
            <footer className='flex-cols flex'>
              <div className=''>
                <div className='flex justify-center'>
                  <Link href='https://github.com/lcchrty'>
                    <Image
                      src='/github-mark-white.png'
                      alt='GitHub Invertocat logo'
                      width={20}
                      height={20}
                      quality={95}
                      className='w-auto content-center object-contain'
                    />
                  </Link>
                </div>
                <Link href='mailto:chndlrchrty@gmail.com'>
                  <p className='mr-4 text-center text-lg'>
                    <span className='font-semibold tracking-widest'>
                      Chandler
                    </span>{' '}
                    Charity{' '}
                  </p>
                </Link>
              </div>
              <div>
                <div className='flex justify-center'>
                  <Link href='https://github.com/juliazlx'>
                    <Image
                      src='/github-mark-white.png'
                      alt='GitHub Invertocat logo'
                      width={20}
                      height={20}
                      quality={95}
                      className='w-auto content-center object-contain'
                    />
                  </Link>
                </div>
                <Link href='mailto:julia.zl.xin@gmail.com'>
                  <p className='mx-4 text-center text-lg'>
                    <span className='font-semibold tracking-widest'>Julia</span>{' '}
                    Xin{' '}
                  </p>
                </Link>
              </div>
              <div>
                <div className='flex justify-center'>
                  <Link href='https://github.com/lhodges3'>
                    <Image
                      src='/github-mark-white.png'
                      alt='GitHub Invertocat  logo'
                      width={20}
                      height={20}
                      quality={95}
                      className='w-auto content-center object-contain'
                    />
                  </Link>
                </div>
                <Link href='mailto:lhodges3@binghamton.edu'>
                  <p className='mx-4 text-center text-lg'>
                    <span className='font-semibold tracking-widest'>Liam</span>{' '}
                    Hodges{' '}
                  </p>
                </Link>
              </div>
              <div>
                <div className='flex justify-center'>
                  <Link href='https://github.com/Gambarou'>
                    <Image
                      src='/github-mark-white.png'
                      alt='GitHub Invertocat logo'
                      width={20}
                      height={20}
                      quality={95}
                      className='w-auto content-center object-contain'
                    />
                  </Link>
                </div>
                <Link href='mailto:peelintaters85@gmail.com'>
                  <p className='mx-4 text-center text-lg'>
                    <span className='font-semibold tracking-widest'>
                      Robert
                    </span>{' '}
                    Hoover{' '}
                  </p>
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
