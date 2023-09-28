import { Box, Flex, Section } from '@radix-ui/themes';
import React from 'react';

export default function InvoiceDisplay() {
  return (
    <main className='flex h-full w-full flex-col items-center justify-center space-y-4'>
      <h1 className='flex w-1/2 items-start text-2xl font-bold'>Invoice</h1>
      <section className=' w-1/2 space-y-8 rounded-lg bg-gray-500/10 p-10 text-white/80'>
        <Flex justify='between' width='100%'>
          <Box>
            <p className='text-xl'>
              #<span className='font-bold text-white/90'>083543</span>
            </p>
          </Box>
          <p>ESC Socal</p>
        </Flex>
        <Flex justify='between' className='pr-12'>
          <div className='flex flex-col space-y-8'>
            <Flex direction='column' className='space-y-2'>
              <h3 className='text-xs'>Invoice Date</h3>
              <p className=' font-bold'>01 Jul 2023</p>
            </Flex>
            <Flex direction='column' className='space-y-2'>
              <h3 className='text-xs'>Payment Due</h3>
              <p className=' font-bold'>30 Jul 2023</p>
            </Flex>
          </div>
          <div className='space-y-2'>
            <h3 className='text-xs'>Bill to</h3>
            <p className='font-bold'>Jensen Huang</p>
          </div>
          <div className='space-y-2'>
            <h3 className='text-xs'>Sent to</h3>
            <p className=' font-bold'>jensenh@mail.com</p>
          </div>
        </Flex>
        <div className='flex justify-between rounded-md bg-gray-400/10 p-10'>
          <Flex justify='between'>
            <div className='space-y-2'>
              <h3 className='text-xs'>Item Name</h3>
              <p className='font-bold'>Contract Services</p>
            </div>
          </Flex>
          <Flex justify='between' className='space-x-12' align='center'>
            <div className='flex flex-col items-center space-y-2'>
              <h3 className='text-xs'>QTY</h3>
              <p className='font-bold'>1</p>
            </div>
            <div className='flex flex-col items-end space-y-2'>
              <h3 className='text-xs'>Price</h3>
              <p className='font-bold'>$1000.00</p>
            </div>
            <div className='flex flex-col items-end space-y-2'>
              <h3 className='text-xs'>Total</h3>
              <p className='font-bold'>$1000.00</p>
            </div>
          </Flex>
        </div>
      </section>
    </main>
  );
}
