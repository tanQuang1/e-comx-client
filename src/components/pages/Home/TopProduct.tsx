import React from 'react';
import { Icon, IconifyIcon } from '@iconify/react';
import Button from '@/components/ui/Button';
import { ProductDataType } from '@/types/product.type';
import { formatNumber, getCorrectStarIcon } from '@/utils/helper';
import useCart from '@/hooks/useCart';
import Link from 'next/link';
import { APP_ROUTER } from '@/utils/app-config';
interface ProductsPropsTypes {
  products: ProductDataType[] | undefined;
}
function TopProduct(props: ProductsPropsTypes) {
  const { products } = props;
  const { incrementProductOnCart } = useCart();
  if (!products) return <></>;
  const handleStarIconOfProduct = (product: ProductDataType) => {
    return getCorrectStarIcon(product?.avg_review);
  };
  const starsOnActiveProduct = handleStarIconOfProduct(products[0]);

  return (
    <div className='home__collection '>
      <div
        className='collection-aside'
        title='Click on product name to read more about the product'
      >
        <Link
          href={`${APP_ROUTER.PRODUCT_LIST}/${products[0]._id}`}
          className='content-left'
          style={{ backgroundImage: `url(${products[0]?.images[0].url})` }}
        >
          <div className='overlay'></div>
        </Link>
        <div className='content-right'>
          <div className='text'>
            <Link className='text-title' href={`${APP_ROUTER.PRODUCT_LIST}/${products[0]._id}`}>
              {products[0]?.name}
            </Link>
            <div className='text-rank'>
              {starsOnActiveProduct.map((star: IconifyIcon | string, starIndex: number) => (
                <Icon icon={star} width='16' height='16' className='star' key={starIndex} />
              ))}
            </div>
            <div className='text-price'>${formatNumber(products[0]?.price)}</div>
            {/* <p
              className='text-des'
              dangerouslySetInnerHTML={{
                __html: products[0]?.description ? products[0]?.description : '',
              }}
            ></p> */}
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
                  <span>{products[0]?.brand}</span>
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
            <div className='text-btn'>
              <Button size='md' onClick={() => incrementProductOnCart(products[0], 1)}>
                ADD TO CART
              </Button>
              <Button size='icon' color='secondary'>
                <Icon icon='mdi:cards-heart-outline' />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className='collection-section'>
        {products?.map(
          (product: ProductDataType, index: number) =>
            index != 0 && (
              <Link
                key={index}
                href={`${APP_ROUTER.PRODUCT_LIST}/${product?._id}`}
                className='section--item'
              >
                <div
                  className='section--item-img'
                  style={{ backgroundImage: `url(${product?.images[0].url})` }}
                >
                  <div className='overlay'></div>
                </div>
                <div className='text'>
                  <div className='text-title'>{product?.name} </div>
                  <div className='text-rank'>
                    {handleStarIconOfProduct(product).map(
                      (star: IconifyIcon | string, starIndex: number) => (
                        <Icon icon={star} width='16' height='16' className='star' key={starIndex} />
                      ),
                    )}
                  </div>
                  <div className='text-price'>${formatNumber(product?.price)}</div>
                </div>
              </Link>
            ),
        )}
      </div>
    </div>
  );
}

export default TopProduct;
