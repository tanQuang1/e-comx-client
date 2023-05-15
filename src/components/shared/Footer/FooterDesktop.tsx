import Button from '@/components/ui/Button';
import TextField from '@/components/ui/TextField';
import { Icon } from '@iconify/react';
import React from 'react';
import appstore from '@/assets/images/appstore.png';
import googleplay from '@/assets/images/googleplay.png';
import { dataSection, iconType } from './config';
import Image from 'next/image';
import Link from 'next/link';

const FooterDesktop = () => {
  return (
    <div className='footerDes'>
      <div className='footerDes__top'>
        <div className='footerDes__top--items'>
          <span>Follow Us</span>
          <div className='content  text-description'>
            We make consolidating, marketing and tracking your social media website easy.
          </div>
          <div className='content--bottom'>
            <ul>
              {iconType.map((item: any, i: number) => (
                <li key={i}>
                  <Link style={{ backgroundColor: item.colorBox }} href='/#'>
                    <Icon icon={`${item.icon}`} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className='footerDes__top--items'>
          <span>Sign Up To Newsletter</span>
          <div className='content text-description'>
            Join 60.000+ subscribers and get a new discount coupon on every Saturday.
          </div>
          <div className='content--bottom subscribe--input'>
            <div className='subscribe--input input--item'>
              <TextField placeholder='Your email address...' variant='medium' />
            </div>
            <div className='subscribe--input button--item'>
              <Button className='' size='lg'>
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        <div className='footerDes__top--items'>
          <span>Download App</span>
          <div className='content text-description'>
            Dukamarket App is now available on App Store & Google Play. Get it now.
          </div>
          <div className='content--bottom'>
            <Link href='/#'>
              <Image src={appstore} alt='' />
            </Link>
            <Link href='/#'>
              <Image src={googleplay} alt='' />
            </Link>
          </div>
        </div>
      </div>

      <div className='set__center--main'>
        <div className='footerDes__main'>
          {dataSection.map((item: any, index: number) => (
            <div key={index} className='footerDes__main--sectionItems'>
              <h3>{item.title}</h3>
              <div className='quick-links'>
                {item.menu.map((item: any, itemIndex: number) => (
                  <Link key={itemIndex} href='/#'>
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <div className='footerDes__main--aside'>
            <div className='contact'>
              <h3>About the store</h3>
              <p>
                Our mission statement is to provide the absolute best customer experience available
                in the Electronic industry without exception.
              </p>
              <div className='phone'>
                <Icon width={54} height={54} icon='bx:headphone' />

                <div className='phone__container'>
                  <span>Got Question? Call us 24/7!</span>
                  <span>
                    <Link href='tel:+001 123 456 789'>+001 123 456 789</Link>
                  </span>
                </div>
              </div>
              <p>Add: 118 Le Loi, Phuong4, Go Vap, Ho Chi Minh City</p>
              <p>Mail: alothemes@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterDesktop;
