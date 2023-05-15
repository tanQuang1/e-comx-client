import { useRouter } from 'next/router';
import React, { useState } from 'react';
import api from '@/services';
import { Icon, IconifyIcon } from '@iconify/react';
import { APP_ICONS } from '@/utils/app-config';
import QuantityTextField from '@/components/ui/QuantityTextField';
import Button from '@/components/ui/Button';
import Loading from '@/components/ui/Loading';
import Accordion from '@/components/ui/Accordion';
import Reviews from './reviews';
import DetailsImage from './detailsImage';
import ClientLayout from '@/components/shared/Layout/ClientLayout';
import Meta from '@/components/shared/Meta/Meta';
import { getCorrectAvgStarIcon } from '@/utils/helper';
import useCart from '@/hooks/useCart';
import { toast } from 'react-toastify';
export default function Test() {
  const router = useRouter();
  // const {}= useCart()
  const productId = router?.query?.id;
  const { currentData, isLoading, isError } = api.useGetProductByIdQuery(productId);
  const fetchDataReviews = api.useGetReviewsByIdProductQuery(productId, {
    skip: isError,
  });
  const [quantity, setQuantity] = useState<number>(1);
  const [accordionIndexes, setAccordionIndexes] = useState<number[]>([]);
  const stars = getCorrectAvgStarIcon(currentData?.avg_review);
  const { incrementProductOnCart, updateCart } = useCart();

  if (isError) {
    toast('Product not found', { type: 'error' });
    router.push('/');
  }

  // accordion list
  const accordionList = [
    {
      id: 0,
      header: 'Description',
      children: <div dangerouslySetInnerHTML={{ __html: currentData?.description || '' }}></div>,
    },
    {
      id: 1,
      header: `Reviews(${fetchDataReviews?.currentData?.length || 0})`,
      children: (
        <Reviews
          dataReviews={fetchDataReviews?.currentData || []}
          productId={productId || ''}
          avg_star={stars}
        />
      ),
    },
  ];
  const toggleAccordion = (index: number) => {
    if (accordionIndexes.includes(index)) {
      setAccordionIndexes(accordionIndexes.filter((item) => item !== index));
    } else {
      setAccordionIndexes([...accordionIndexes, index]);
    }
  };

  //quantity product
  function handleChangeQuantity(newQuantity: number) {
    if (newQuantity > 0) {
      setQuantity(newQuantity);
    }
  }
  console.log(quantity);

  function redirectToCheckOut() {
    if (currentData) {
      const payload = [
        {
          product: currentData,
          quantity: 1,
        },
      ];
      updateCart(payload);
      router.push('/checkout');
    }
  }
  if (!productId || isLoading) {
    return <Loading />;
  }
  return (
    <ClientLayout meta={<Meta title='Home page' description='Lorem ipsum' />}>
      <div>
        <div className='product'>
          <div className='product__details'>
            <DetailsImage listImage={currentData?.images ? currentData?.images : []} />

            <div className='detail__content'>
              <h1 className='content__product'>{currentData?.name}</h1>
              <div className='content__reviews'>
                <div className='star--reviews'>
                  {stars.map((star: IconifyIcon | string, index: number) => {
                    return <Icon width={16} height={16} icon={star} key={index}></Icon>;
                  })}
                </div>
                {fetchDataReviews?.currentData?.length === 0 ? (
                  <p className='badge--caption'>No reviews</p>
                ) : (
                  <p className='badge--caption'>{`${fetchDataReviews?.currentData?.length} review`}</p>
                )}

                <p className='badge--caption'>write a review</p>
              </div>
              {currentData?.selling === 0 ? null : (
                <p className='content__discount'>{`Discount:₫ (${currentData?.selling})`}</p>
              )}
              <div className='content__price'>
                <span className={`${currentData?.selling === 0 ? 'money' : 'money-discount'}`}>
                  <span className='unit'>₫</span> {currentData?.price.toLocaleString()}
                </span>
                {currentData?.selling === 0 ? null : (
                  <span className='compare'>
                    <span className='unit'>₫</span>
                    {currentData?.price}
                  </span>
                )}
              </div>
              <div className='content__description'>
                <div
                  className='description--view'
                  dangerouslySetInnerHTML={{ __html: currentData?.description || '' }}
                ></div>
                <span className='description--viewMore'>
                  ...
                  <span
                    onClick={() => {
                      toggleAccordion(0);
                    }}
                  >
                    <a href='#description'>View more</a>
                  </span>
                </span>
              </div>

              <div className='content__quantity'>
                <div className='quantity'>
                  <QuantityTextField quantity={quantity} onChange={handleChangeQuantity} />
                </div>
                <div className='add-to-cart'>
                  <Button
                    size='lg'
                    onClick={() => {
                      if (currentData) {
                        incrementProductOnCart(currentData, quantity);
                      }
                    }}
                  >
                    ADD TO CART
                  </Button>
                </div>
              </div>
              <div className='content__buyNow'>
                <Button color='quinary' size='lg' onClick={redirectToCheckOut}>
                  BUY IT NOW
                </Button>
              </div>
              <div className='content__compareWishlist'>
                <div className='compare compareWishlist'>
                  <Icon width={20} height={20} icon={APP_ICONS.layer}></Icon>
                  <span>Add To Compare</span>
                </div>
                <div className='wishlist compareWishlist'>
                  <Icon width={20} height={20} icon={APP_ICONS.heart}></Icon>
                  <span>Add To Wishlist</span>
                </div>
              </div>
              <div className='content__countdown'>
                <div className='countdown '>
                  <p>
                    Order in next{' '}
                    <span className='countdown__time'>
                      {' '}
                      <span className='time'>09</span> hours <span className='time'>39</span>{' '}
                      minutes <span className='time'>18</span> second
                    </span>{' '}
                    to get it
                  </p>
                </div>
              </div>
              <div className='content__collection'>
                <div className='collection--real-time collection'>
                  <p>Real Time</p>
                  <span className='number-customer'>20</span> visitor right now
                </div>
                <div className='collection--brand collection'>
                  <p>Branch :</p>
                  <span>{currentData?.brand}</span>
                </div>
                <div className='collection--subcategory collection'>
                  <p>Product type :</p>
                  <span>{currentData?.subcategory && currentData?.subcategory?.name}</span>
                </div>
                <div className='collection--available collection'>
                  <p>Availability :</p>
                  <span>{currentData?.available}</span>
                </div>
              </div>
            </div>
          </div>
          <div className='product__accordion'>
            <div className='accordion__description' id='description'>
              {accordionList.map((accordion, accordionIndex) => (
                <Accordion
                  key={accordion.id}
                  open={accordionIndexes.includes(accordionIndex)}
                  onClick={() => toggleAccordion(accordionIndex)}
                  header={accordion.header}
                >
                  {accordion.children}
                </Accordion>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}
