import { UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import React from 'react';

function Profile() {
  const pathname = usePathname();

  return (
    <div className='flex items-center space-x-2 text-white/90'>
      <UserButton afterSignOutUrl={pathname} />
    </div>
  );
}

export default Profile;
