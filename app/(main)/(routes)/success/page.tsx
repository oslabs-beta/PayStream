'use client';

import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

export default function Successful() {
  const animationURL = '/payment-success.json';
  return (
    <main className='flex h-5/6 flex-col items-center justify-center p-24 text-xl font-semibold'>
      <Player
        className='h-[500px] w-[500px]'
        autoplay
        src={animationURL}
      ></Player>
    </main>
  );
}
