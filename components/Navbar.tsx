import React from 'react';
import Link from "next/link";
import Image from "next/image";
const Navbar = () => {
  return (
    <div>
        <Image
        src='/bg-logo.png' 
        alt='logo' 
        width={200}
        height={100}
        className='object-contain'
        />
    </div>
  )
}

export default Navbar