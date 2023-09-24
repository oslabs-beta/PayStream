import React from 'react';

export default function Successful() {
  // using stripe id, get salesforce id

  // use effect that hits the postman route to update salesforce record
  // app updates salesforce
  // pass stripe info to this app to update salesforce

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      Payment Successful
    </main>
  );
}
