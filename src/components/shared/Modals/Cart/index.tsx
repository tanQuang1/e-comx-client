import Image from 'next/image';
import React from 'react';
import CartEmptyIcon from '@/assets/images/cart-empty.svg';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { APP_ICONS, APP_ROUTER } from '@/utils/app-config';
import { Icon } from '@iconify/react';
import useCart from '@/hooks/useCart';
import ProductInfo from './ProductInfo';
import { CartItemType } from '@/store/app/app.type';

interface CartModalPropsType {
  onClose: () => void;
}
function Cart(props: CartModalPropsType) {
  const { cart, amountProductInCart, calculateTotalPriceOfCart } = useCart();

  return (
    <div className='cart-modal'>
      <section className='cart-modal__header'>
        <h2 className='header__title'>
          Shopping Cart
          <span className='header__number'>{amountProductInCart()}</span>
        </h2>
        <Icon
          className='header__close-icon'
          width={20}
          height={20}
          icon={APP_ICONS.X}
          onClick={props.onClose}
        />
      </section>
      <section className={`cart-modal__inner ${cart.length !== 0 ? '' : 'empty'}`}>
        <div className='cart-empty'>
          <Image width={140} height={100} src={CartEmptyIcon} alt='empty cart' />
          <p className='cart-empty__title'>Your cart is empty</p>
          <Link href={APP_ROUTER.PRODUCT_LIST} className='cart-empty__link'>
            <Button size='lg'> Return to shop</Button>
          </Link>
        </div>
        <ul className='cart__list'>
          {cart.length !== 0 &&
            cart.map((item: CartItemType) => (
              <ProductInfo product={item.product} quantity={item.quantity} key={item.product._id} />
            ))}
        </ul>
      </section>
      <div className='cart__bottom-group'>
        <div className='total'>
          <p className='total__text'>Total</p>
          <p className='total__number'>${calculateTotalPriceOfCart()}</p>
        </div>
        <Link href={APP_ROUTER.CART}>
          <Button size='md' color='secondary'>
            View cart
          </Button>
        </Link>
        <Link href={APP_ROUTER.CHECKOUT}>
          <Button disabled={cart.length === 0} size='md'>
            Check out
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default React.memo(Cart);
