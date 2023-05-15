import React from 'react';
import imgcontent1 from '@/assets/images/imgcontentsale1.png';
import imgcontent2 from '@/assets/images/imgcontentsale2.png';
import imgcontent3 from '@/assets/images/imgcontentsale3.png';
import imgcontent4 from '@/assets/images/imgcontentsale4.png';
import Button from '@/components/ui/Button';
function BottomBanner() {
  return (
    <div className='bottomBanner'>
      <div className='marquee'>
        <p>
          Free UK delivery - Return over $100.00 ( Excluding Homeware ) | Free UK Collect From Store
        </p>
        <p>
          Design Week / <strong>15% Off </strong> the website / Code: AYOSALE-2020
        </p>
        <p>Orders shipping as usual. See more: COVID-19 FAQ</p>
        <p>Always iconic. Now organic. Introducing the $20 Organic Tee.</p>
        <p>
          With each receipt over $150 from AYO Store get voucher <strong>15% off</strong>
          immediately.
        </p>
      </div>

      <div className='contentSale '>
        <div className='contentSale-item' style={{ backgroundImage: `url(${imgcontent3.src})` }}>
          <div className='overlay'></div>
          <div className='contentSale-text'>
            <span className='text-sub'>HOT DEAL</span>
            <div className='text-title'>
              <div>Sale 30% Off</div> Top Computer Case Gaming
            </div>
          </div>
        </div>
        <div className='contentSale-item middleItem'>
          <div className='middleItem-item' style={{ backgroundImage: `url(${imgcontent4.src})` }}>
            <div className='overlay'></div>
            <div className='contentSale-text'>
              <div className='text-title'>
                Electronic Deals
                <p>Laptop, Computer, Smartphone, Gampad</p>
                <Button color='secondary' size='md'>
                  LEARN MORE
                </Button>
              </div>
            </div>
          </div>
          <div className='middleItem-item' style={{ backgroundImage: `url(${imgcontent2.src})` }}>
            <div className='overlay'></div>
            <div className='contentSale-text'>
              <div className='text-title' style={{ alignItems: 'start' }}>
                Hot Products <div> Laptop Ultra 4K 16”</div>
                <p>Discount 20% On Products</p>
              </div>
            </div>
          </div>
        </div>
        <div className='contentSale-item' style={{ backgroundImage: `url(${imgcontent1.src})` }}>
          <div className='overlay'></div>
          <div className='contentSale-text'>
            <span className='text-sub'>NEW ARIVALS</span>
            <div className='text-title'>
              <div>Sport Edition</div>Best Choice Of The Year
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BottomBanner;
