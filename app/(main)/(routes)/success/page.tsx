'use client';

import React, { useEffect } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import axios from 'axios';

export default function Successful() {
  const animationURL = '/payment-success.json';

  useEffect(() => {
    // const axios = require('axios');
    let data = JSON.stringify({
      allowSaveOnDuplicate: false,
      fields: {
        npe01__Paid__c: true,
      },
    });

    let config = {
      method: 'patch',
      maxBodyLength: Infinity,
      url: 'https://escsocal--lc001.sandbox.my.salesforce.com/services/data/v58.0/ui-api/records/a01Ei0000067dCVIAY',
      headers: {
        'Content-Type': 'application/json',
        Authorization: process.env.SF_AUTH,
        Cookie: process.env.SF_COOKIE_AUTH,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  });
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
