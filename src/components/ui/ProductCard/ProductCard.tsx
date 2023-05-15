import image from '@/assets/images/img_page404.svg';
import Link from 'next/link';
import { APP_ICONS, APP_ROUTER } from '@/utils/app-config';
import { Icon, IconifyIcon } from '@iconify/react';
import Image from 'next/image';
import React from 'react';
import Button from '../Button';
import Loading from '../Loading';
import { ProductDataType } from '@/types/product.type';
import useCart from '@/hooks/useCart';
import { formatNumber, getCorrectStarIcon } from '@/utils/helper';

interface ProductCardPropsType {
  product: ProductDataType;
  openModal: () => void;
  loading?: boolean;
  showAvailable?: boolean;
}

function ProductCard(props: ProductCardPropsType) {
  const { product, openModal, loading = false, showAvailable = false } = props;
  const { incrementProductOnCart } = useCart();

  const stars = getCorrectStarIcon(product.avg_review);

  return (
    <div className='card'>
      {/* <div className='card__flag'>
        <span className='flag flag--discount'>12%</span>
        <span className='flag flag--out-stock '>Out stock</span>
      </div> */}
      <div className='card__image'>
        <Image
          fill={true}
          src={product.images.length !== 0 ? product.images[0].url : image}
          alt='Card image cap'
        />
        <div className='card__image-overlay'>
          <div className='body'>
            <Button size='sm' color='secondary' className='btn--open-eye' onClick={openModal}>
              <Icon width={14} height={14} icon={APP_ICONS.openEye} />
            </Button>
            <Button size='sm' color='secondary'>
              <Icon icon={APP_ICONS.layer} width={14} height={14} />
            </Button>
            <Button size='sm' color='secondary'>
              <Icon width={14} height={14} icon={APP_ICONS.heart} />
            </Button>
          </div>
        </div>
      </div>
      <div className='card__body'>
        <Link href={`${APP_ROUTER.PRODUCT_LIST}/${product._id}`} className='card__detail'>
          <p className='card__title' title='Product name'>
            {product.name}
            {product.name}
          </p>
          <div className='card__stars'>
            {stars.map((star: IconifyIcon | string, starIndex: number) => (
              <Icon icon={star} width='16' height='16' className='star' key={starIndex} />
            ))}
          </div>
          <div className='card__description'>
            <p
              dangerouslySetInnerHTML={{ __html: product?.description ? product?.description : '' }}
            ></p>
          </div>
        </Link>
        <div className='card__action'>
          {showAvailable ? (
            <>
              <div className='card__stock'>
                {product.available > 0 ? (
                  <>
                    <span>Availability: </span>
                    <span className='detail'>{`In stock (${product.available} items)`}</span>
                  </>
                ) : (
                  <span className='detail'>'Out of Stock'</span>
                )}
                <div className='card__price'>
                  {/* add class discount for class --current if there is discount property */}
                  <b className='card__price--current'>${formatNumber(product.price)}</b>
                  {/* <s className='card__price--old'>$102</s> */}
                </div>
              </div>
            </>
          ) : null}

          {/* <div className='card__product-stock'>
          <div className='card__process'>
            <progress value='40' max='100'>
              {product.available}
            </progress>
          </div>
          <div className='card__stock-data'>
            <p>
              Sold: <span>{product.selling}</span>
            </p>
            <p>
              Available: <span>{product.available}</span>
            </p>
          </div>
        </div> */}
          {product.available > 0 ? (
            <Button size='md' onClick={() => incrementProductOnCart(product, 1)}>
              Add to cart
            </Button>
          ) : (
            <Link href={`${APP_ROUTER}/${product._id}`}>
              <Button size='md'>Out of stock</Button>
            </Link>
          )}
          <Button onClick={openModal} color='tertiary' variant='outlined' className='btn--view'>
            {loading && <Loading size='sm' position='none' />}
            Quick view
          </Button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(ProductCard);
