import slide1 from '@/assets/images/1_3750x.png';
import slide2 from '@/assets/images/2_3750x_1.png';
import slide3 from '@/assets/images/3_3750x_11zon.png';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Pagination } from 'swiper';
import Button from '@/components/ui/Button';
import { APP_ROUTER } from '@/utils/app-config';
import Link from 'next/link';
export default function AdsSlide() {
  SwiperCore.use([Pagination]);
  const listSlide = [
    {
      image: slide3.src,
      title: 'HOT DEAL',
      sale: 'SALE 20% OFF',
      name: 'SAMSUNG GALAXY BUDS',
      desc: 'Top Quality Earbuds & Accessories',
    },
    {
      image: slide2.src,
      title: 'HOT DEAL',
      sale: 'SALE 30% OFF',
      name: ' FUTURED FOOTBALL BOOTS ',
      desc: 'Discount 30% On Products & Free Shipping',
    },
    {
      image: slide1.src,
      title: 'HOT DEAL',
      sale: ' SPORT  EDITION',
      name: 'BEST CHOICE  OF THE YEAR',
      desc: 'Discount 20% On Products & Free Shipping',
    },
  ];
  return (
    <div className='adsSlide'>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
      >
        {listSlide.map((slide: any, index: number) => (
          <SwiperSlide key={index}>
            <div className='adsSlide-caption'>
              <span className='adsSlide-caption-title'>{slide.title}</span>
              <span>{slide.sale}</span>
              <span>{slide.name}</span>
              <span style={{ fontSize: '1.8rem', marginTop: '1rem' }}>{slide.desc}</span>
              <Link href={APP_ROUTER.PRODUCT_LIST}>
                <Button color='secondary' size='md'>
                  DISCOVER NOW
                </Button>
              </Link>
            </div>
            <Image
              width={1000}
              height={300}
              sizes='(width:100%,height: 40rem)'
              alt=''
              src={slide.image}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
