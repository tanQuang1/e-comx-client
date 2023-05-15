import Image from 'next/image';
import FooterDesktop from './FooterDesktop';
import FooterMobile from './FooterMobile';
import payment_325x29 from '@/assets/images/payment_325x29.png';
import { memo } from 'react';

function Footer() {
  return (
    <footer className='footer'>
      <FooterDesktop />
      <FooterMobile />
      <div className='footer__note'>
        <div className='footer__note--payPal'>
          <Image src={payment_325x29} alt='' />
        </div>
        <div className='footer__note--copyRight'>
          <h3 className='content text-description'>
            Copyright © <a href='#'>Dukamarket.</a> all rights reserved.Powered by
            <a href='#'> alothemes.</a>
          </h3>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
