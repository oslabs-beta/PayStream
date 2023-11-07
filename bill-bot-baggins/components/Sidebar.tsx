import React from 'react';
import { LayoutDashboard, DollarSign } from 'lucide-react';
import Image from 'next/image';

function Sidebar() {
  return (
    <div className='fixed hidden h-full w-[250px] flex-col justify-start border border-neutral-800 bg-neutral-900 text-stone-300 xl:flex'>
      <div className='flex p-2'>
        <Image
          src={'/logo.png'}
          alt='logo'
          width={200}
          height={25}
          className=''
        />
      </div>
      <div className='pl-8'>
        <section className='space-y-8 font-semibold'>
          <div className='flex flex-col space-y-2'>
            <h3>Home</h3>
            <div className='flex cursor-pointer items-center space-x-1 pl-3 hover:text-orange-500'>
              <LayoutDashboard size={'16px'} />
              <p>Dashboard</p>
            </div>
            <div className='flex cursor-pointer items-center space-x-1 pl-3 hover:text-orange-500'>
              <DollarSign size={16} />
              <p>Opportunities</p>
            </div>
          </div>
          <div>
            <h3>Projects</h3>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Sidebar;
