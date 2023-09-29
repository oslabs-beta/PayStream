import React from 'react';

function Authlayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-5/6 items-center justify-center bg-[url("/background.jpeg")] bg-cover bg-center bg-no-repeat'>
      {children}
    </div>
  );
}

export default Authlayout;
