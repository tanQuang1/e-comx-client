import React, { useState } from 'react';
import { ImageType } from '@/types/product.type';
import Button from '../../../ui/Button';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import QuantityTextField from '../../../ui/QuantityTextField';
import SwiperCore, { Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import api from '@/services';
import Image from 'next/image';
import Loading from '@/components/ui/Loading';
import { APP_ROUTER } from '@/utils/app-config';
import { formatNumber } from '@/utils/helper';
import useCart from '@/hooks/useCart';
interface ProductDetailPropsType {
  productId: string;
  onClose: () => void;
}

function ProductDetail(props: ProductDetailPropsType) {
  const { productId, onClose } = props;
  const { incrementProductOnCart } = useCart();
  const [quantity, setQuantity] = useState<number>(1);
  const { data, isLoading, isError } = api.useGetProductByIdQuery(productId);
  SwiperCore.use([Pagination]);

  function handleChangeValue(value: number) {
    setQuantity(value);
  }
  if (isLoading) return <Loading position='absolute' />;
  if (isError) return <h1 className='not-found-message'>Not found product</h1>;
  return (
    <div className='product-detail-modal'>
      <Button className='close-detail' onClick={onClose}>
        <Icon width={16} height={16} icon='material-symbols:close' />
      </Button>
      <div className='detail'>
        <div className='detail__images'>
          <Swiper
            modules={[Autoplay]}
            autoplay={{
              disableOnInteraction: false,
              delay: 3000,
              pauseOnMouseEnter: true,
              stopOnLastSlide: false,
            }}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
          >
            {data?.images?.map((img: ImageType, index: number) => (
              <SwiperSlide key={index}>
                <Image
                  fill
                  sizes='(max-width:45rem, max-height: 40rem)'
                  src={img.url}
                  alt={`Slide ${index}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className='detail__section'>
          <Link className='title' href={`${APP_ROUTER.PRODUCT_LIST}/${productId}`}>
            {data?.name}
          </Link>
          <div className='star-rating'>
            <span>
              <span>
                <Icon width={16} height={16} icon='ic:round-star-border' />
                <Icon width={16} height={16} icon='ic:round-star-border' />
                <Icon width={16} height={16} icon='ic:round-star-border' />
                <Icon width={16} height={16} icon='ic:round-star-border' />
                <Icon width={16} height={16} icon='ic:round-star-border' />
              </span>
              <span className='space-span'>/</span>
              <span className='caption'>{data?.avg_review} reviews</span>
              <span className='space-span'>/</span>
              <span className='caption'>Write a reviews</span>
            </span>
          </div>
          <div className='price'>
            {/* <p className='price-sale-details'>Discount: $20.00 (29%) </p> */}
            <span className='price--sale'>
              <span className='current'>
                <span className='money'>${formatNumber(data?.price || 0)}</span>
              </span>
              {/* <span className='compare'>
                <span className='money'>${data?.selling}</span>
              </span> */}
            </span>
          </div>
          <div className='description'>
            <p dangerouslySetInnerHTML={{ __html: data?.description ? data?.description : '' }}></p>
          </div>
          <div className='group-quantity-button'>
            <span className='group-quantity-button--left'>
              <QuantityTextField quantity={quantity} onChange={handleChangeValue} />
            </span>
            <aside className='group-quantity-button--right'>
              <Button size='lg' onClick={data ? () => incrementProductOnCart(data, 1) : () => {}}>
                ADD TO CART
              </Button>
            </aside>
          </div>
          <div className='compare-wishlist'>
            <span>
              <Icon icon='bx:layer' />
              <span>Add to compare</span>
            </span>
            <span>
              <Icon icon='material-symbols:heart-plus-outline' />
              <span>Add to wishlist</span>
            </span>
          </div>
          <div className='product-collection'>
            <div className='collection-date'>
              <p>Order in the next to get it </p>
            </div>
            <div className='collection-list'>
              <div className='list-item'>
                <label>Real time</label>
                <span style={{ color: '#888888' }}>
                  <span
                    style={{
                      padding: '0 0.5rem 0  0.5rem',
                      borderRadius: '0.3rem',
                      color: 'white',
                      background: '#0a2748',
                    }}
                  >
                    44
                  </span>{' '}
                  visitor right now
                </span>
              </div>
              <div className='list-item'>
                <label>Sku:</label>
                <span> N/A-01</span>
              </div>
              <div className='list-item'>
                <label>Barcode:</label>
                <span>{data?.brand}</span>
              </div>
              <div className='list-item'>
                <label>Product type:</label>
                <span style={{ color: '#4F4F4F' }}>Accessories</span>
              </div>
              <div className='list-item'>
                <label>Availability:</label>
                <span style={{ color: '#cc1414' }}>Many in stock</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
