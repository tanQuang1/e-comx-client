import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import headerLogo from '@/assets/images/logo_header.webp';

export default function Logo() {
  return (
    <div className='header__logo'>
      <Link href='/' className='header__logo--img'>
        <h1>
          <Image src={headerLogo} alt='Logo' width='0' height='0' style={{ height: 'auto' }} />
        </h1>
      </Link>
    </div>
  );
}
