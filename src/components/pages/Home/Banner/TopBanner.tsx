import React from 'react';
import image1 from '@/assets/images/1_900x.png';
import image2 from '@/assets/images/2_900x.png';
import image3 from '@/assets/images/3_900x.png';
import { APP_ICONS } from '@/utils/app-config';
import { Icon } from '@iconify/react';
const advertiseTopCard = [
  {
    icon: APP_ICONS.shippingCar,
    title: 'FREE DELIVERY',
    des: 'For all orders over $120',
  },
  {
    icon: APP_ICONS.payment,
    title: 'SAFE PAYMENT',
    des: '100% secure payment',
  },
  {
    icon: APP_ICONS.help,
    title: '24/7 HELP CENTER',
    des: 'Dedicated 24/7 support',
  },
  {
    icon: APP_ICONS.friendlyServices,
    title: 'FRIENDLY SERVICES',
    des: '30 day satisfaction guarantee',
  },
];
const advertiseBottomCard = [
  {
    image: image1,
    title1: ' Intelligent ',
    title2: 'New Touch Control',
    des: 'Discount  20% On Products',
  },
  {
    image: image2,
    title1: 'On-sale ',
    title2: 'Best Prices Headphone',
    des: 'Limited Time: Online Only!',
  },
  {
    image: image3,
    title1: 'Hot Sale',
    title2: ' Super Laptops 2022',
    des: 'Free Shipping All Order',
  },
];
function TopBanner() {
  return (
    <div className='top-banner'>
      <div className='advertiseTop'>
        {advertiseTopCard.map((advertiseTopCardItem: any, index: number) => (
          <div key={index} className='advertiseTop-card'>
            <div className='advertiseTop-card__icon'>
              <Icon width={42} height={42} icon={advertiseTopCardItem.icon} />
            </div>
            <div className='advertiseTop-card__content'>
              <h3>{advertiseTopCardItem.title}</h3>
              <p>{advertiseTopCardItem.des}</p>
            </div>
          </div>
        ))}
      </div>
      <div className='advertiseBottom'>
        {advertiseBottomCard.map((advertiseBottomCardItem: any, index: number) => (
          <div
            key={index}
            className='advertiseBottom-card'
            style={{
              backgroundImage: `url(${advertiseBottomCardItem.image.src})`,
            }}
          >
            <div className='overlay'></div>
            <div className='advertiseBottom-card__content'>
              <h3>
                <span style={{ display: 'block' }}>{advertiseBottomCardItem.title1}</span>
                {advertiseBottomCardItem.title2}
              </h3>
              <div>{advertiseBottomCardItem.des}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopBanner;
