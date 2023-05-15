import React, { useEffect, useState } from 'react';
import AdsSlide from './Slide/AdsSlide';
import InfinitySlide from './Slide/InfinitySlide';
import Link from 'next/link';
import TopBanner from './Banner/TopBanner';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductCard from '@/components/ui/ProductCard/ProductCard';
import { Autoplay, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Modal from '@/components/ui/Modal';
import ProductDetail from '@/components/shared/Modals/ProductDetail/ProductDetail';
import MiddleBanner from './Banner/MiddleBanner';
import BottomBanner from './Banner/BottomBanner';
import brand1 from '@/assets/images/brand_01_360x.png';
import brand2 from '@/assets/images/brand_02_360x.png';
import brand3 from '@/assets/images/brand_03_360x.png';
import brand4 from '@/assets/images/brand_04_360x.png';
import brand6 from '@/assets/images/brand_06_360x.png';
import brand7 from '@/assets/images/brand_07_360x.png';
import Image from 'next/image';
import TopProduct from './TopProduct';
import api from '@/services';
import Loading from '@/components/ui/Loading';
import { ProductDataType } from '@/types/product.type';
import { APP_ROUTER } from '@/utils/app-config';
type ProductDetailModalType = {
  open: boolean;
  id: string;
};
export default function HomeTemplate() {
  const brand = [brand1, brand2, brand3, brand4, brand6, brand1, brand7];
  const [isOpenModal, setIsOpenModal] = useState<ProductDetailModalType>({ open: false, id: '' });
  const [widthApp, setWidthApp] = useState<number>(0);
  const [renderInfinitySlide, setRenderInfinitySlide] = useState<number>(3);
  const { data, isLoading, isError } = api.useFetchAllProductQuery({ limit: 12 });
  const dataBestSellingProduct = api.useFetchBestSellingProductQuery(12, {
    skip: isError,
  });
  const dataNewProduct = api.useFetchNewestProductQuery(5, {
    skip: isError,
  });

  const handleOpenModal = (id: string) => {
    setIsOpenModal({
      open: true,
      id,
    });
  };
  const handleCloseModal = () => {
    setIsOpenModal({ ...isOpenModal, open: false });
  };
  useEffect(() => {
    window.addEventListener('resize', () => {
      setWidthApp(window.innerWidth);
    });
    window.innerWidth > 1200 ? setRenderInfinitySlide(6) : {};
    window.innerWidth > 1000 && window.innerWidth <= 1200 ? setRenderInfinitySlide(4) : {};
    window.innerWidth > 600 && window.innerWidth <= 1000 ? setRenderInfinitySlide(2) : {};
    window.innerWidth <= 600 ? setRenderInfinitySlide(1) : {};
  }, [widthApp]);

  if (isError) return <h1 className='not-found-message'>Not found product</h1>;
  if (isLoading) return <Loading position='absolute' />;

  return (
    <>
      <AdsSlide />
      <TopBanner />
      <InfinitySlide
        headingLeft='Top Deals Of The Day'
        headingRight={<Link href={APP_ROUTER.PRODUCT_LIST}>View All Products</Link>}
      >
        <Swiper
          slidesPerView={renderInfinitySlide}
          navigation={true}
          modules={[Navigation, Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            stopOnLastSlide: false,
            reverseDirection: false,
          }}
          className='infinitySlide-swiper'
        >
          {dataBestSellingProduct?.data?.products.map((product: ProductDataType, index: number) => (
            <SwiperSlide key={index} virtualIndex={index}>
              <ProductCard openModal={() => handleOpenModal(product._id)} product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </InfinitySlide>
      <MiddleBanner />
      <InfinitySlide
        headingLeft='Top Featured Products'
        headingRight={<Link href={APP_ROUTER.PRODUCT_LIST}>View All Products</Link>}
      >
        {<TopProduct products={dataNewProduct.data ? dataNewProduct?.data?.products : []} />}
      </InfinitySlide>
      <BottomBanner />
      <InfinitySlide
        headingLeft='Recommended For You'
        headingRight={<Link href={APP_ROUTER.PRODUCT_LIST}>View All Products</Link>}
      >
        <Swiper
          slidesPerView={renderInfinitySlide}
          navigation={true}
          modules={[Navigation, Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            stopOnLastSlide: false,
          }}
          className='infinitySlide-swiper'
        >
          {data?.products.map((product: ProductDataType, index: number) => (
            <SwiperSlide key={index} virtualIndex={index}>
              <ProductCard openModal={() => handleOpenModal(product._id)} product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </InfinitySlide>
      <div className='logo-list'>
        <Swiper
          slidesPerView={renderInfinitySlide}
          navigation={true}
          modules={[Navigation]}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
          className='infinitySlide-swiper'
          style={{ borderTop: '1px solid #e5e5e5' }}
        >
          {brand.map((item, index) => (
            <SwiperSlide key={index} virtualIndex={index}>
              <Image width={165} height={73} src={item.src} alt='' />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {isOpenModal.open && (
        <Modal open={isOpenModal.open} onClose={handleCloseModal} placement='center'>
          <ProductDetail onClose={handleCloseModal} productId={isOpenModal.id} />
        </Modal>
      )}
    </>
  );
}
