import React from 'react';

function Authlayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-5/6 items-center justify-center'>{children}</div>
  );
}

export default Authlayout;
