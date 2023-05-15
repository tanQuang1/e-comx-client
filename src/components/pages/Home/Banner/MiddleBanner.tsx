import React from 'react';
import imgMiddle1 from '@/assets/images/middlebaner1.png';
import imgMiddle2 from '@/assets/images/middlebanner2.png';

function MiddleBanner() {
  return (
    <div className='middle-banner'>
      <div className='content-banner' style={{ backgroundImage: `url(${imgMiddle1.src})` }}>
        <div className='overlay'></div>
        <p style={{ color: '#fcbe00' }}>Featured Products</p>
        <p className='content-banner--title'>Accessories IPhone</p>
        <p>Free Shipping All Order $99</p>
      </div>
      <div className='content-banner' style={{ backgroundImage: `url(${imgMiddle2.src})` }}>
        <div className='overlay'></div>
        <p style={{ color: '#fcbe00' }}>Bestseller Products</p>
        <p className='content-banner--title'>PC & Docking Station</p>
        <p>Discount 20% Off, Top Quantity Products</p>
      </div>
    </div>
  );
}

export default MiddleBanner;
