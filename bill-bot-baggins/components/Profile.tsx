import { UserButton } from '@clerk/nextjs';
import React from 'react';

function Profile() {
  return (
    <div className='flex items-center space-x-2 text-white/90 xl:pr-[85px]'>
      <UserButton afterSignOutUrl={'/'} />
    </div>
  );
}

export default Profile;
