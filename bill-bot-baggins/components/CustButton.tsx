'use client';
import React from 'react';
import Image from 'next/image';
import { CustButtonProps } from '@/lib/types';

const CustButton = ({
  title,
  containerStyles,
  handleClick,
}: CustButtonProps) => {
  return (
    <button
      disabled={false}
      type={'button'}
      className={`custom-btn ${containerStyles}`}
      onClick={handleClick}
    >
      <span className={'flex-1'}>{title}</span>
    </button>
  );
};

export default CustButton;
