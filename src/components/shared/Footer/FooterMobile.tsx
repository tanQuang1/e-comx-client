import Accordion from '@/components/ui/Accordion';
import Button from '@/components/ui/Button';
import TextField from '@/components/ui/TextField';
import appstore from '@/assets/images/appstore.png';
import googleplay from '@/assets/images/googleplay.png';
import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import { dataSection, iconType } from './config';
import Image from 'next/image';
import Link from 'next/link';

const accordionList = [
  {
    id: 1,
    header: 'Follow Us',
    children: {
      description: 'We make consolidating, marketing and tracking your social  media website easy.',
    },
    icon: iconType,
  },
  {
    id: 2,
    header: 'Sign Up To Newsletter',
    children: {
      description: ' Join 60.000+ subscribers and get a new discount coupon  on every Saturday. ',
    },
  },
  {
    id: 3,
    header: 'Download App',
    children: {
      description: ' Dukamarket App is now available on App Store & Google Play. Get it now. ',
    },
  },
  {
    id: 4,
    header: 'Help & Customer Care',
    children: {
      description: ' Dukamarket App is now available on App Store & Google Play. Get it now. ',
    },
    listLink: dataSection[0].menu,
  },
  {
    id: 5,
    header: 'My Account',
    children: {
      description: ' Dukamarket App is now available on App Store & Google Play. Get it now. ',
    },
    listLink: dataSection[1].menu,
  },
  {
    id: 6,
    header: 'Quick links',
    children: {
      description: ' Dukamarket App is now available on App Store & Google Play. Get it now. ',
    },
    listLink: dataSection[2].menu,
  },
  {
    id: 7,
    header: 'Customer Service',
    children: {
      description: ' Dukamarket App is now available on App Store & Google Play. Get it now. ',
    },
    listLink: dataSection[3].menu,
  },
  {
    id: 8,
    header: 'About The Store',
    children: {
      description:
        'Our mission statement is to provide the absolute best customer experience available in the Electronic industry without exception. ',
    },
  },
];

const FooterMobile = () => {
  const [accordionIndexes, setAccordionIndexes] = useState<number[]>([]);
  const toggleAccordion = (index: number) => {
    if (accordionIndexes.includes(index)) {
      setAccordionIndexes(accordionIndexes.filter((item) => item !== index));
    } else {
      setAccordionIndexes([...accordionIndexes, index]);
    }
  };
  return (
    <div className='footerMobile'>
      {accordionList.map((accordion, accordionIndex) => (
        <Accordion
          key={accordion.id}
          open={accordionIndexes.includes(accordionIndex)}
          onClick={() => toggleAccordion(accordionIndex)}
          header={accordion.header}
        >
          {accordion.children.description}
          {accordion.icon && (
            <div className='content--bottom'>
              <ul>
                {accordion.icon.map((item: any, itemIndex: number) => (
                  <li key={itemIndex}>
                    <Link style={{ backgroundColor: item.colorBox }} href='/#'>
                      <Icon icon={`${item.icon}`} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {accordion.header == 'Sign Up To Newsletter' && (
            <div className='content--bottom subscribe--input'>
              <div className='input--item'>
                <TextField placeholder='Your email address...' />
              </div>
              <div>
                <Button size='md'>SUBSCRIbE</Button>
              </div>
            </div>
          )}
          {accordion.header == 'Download App' && (
            <div className='content--bottom'>
              <Link href='/#'>
                <Image src={appstore} alt='' />
              </Link>
              <Link href='/#'>
                <Image src={googleplay} alt='' />
              </Link>
            </div>
          )}
          {accordion.header == 'About The Store' && (
            <>
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
            </>
          )}
          <ul>
            {accordion.listLink &&
              accordion.listLink.map((item: any, index: number) => (
                <li key={index} className='quick-links'>
                  <Link href='/#'>{item}</Link>
                </li>
              ))}
          </ul>
        </Accordion>
      ))}
    </div>
  );
};

export default FooterMobile;
