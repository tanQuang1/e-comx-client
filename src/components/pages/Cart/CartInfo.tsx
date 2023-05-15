import Button from '@/components/ui/Button';
import useCart from '@/hooks/useCart';
import { APP_ROUTER } from '@/utils/app-config';
import Link from 'next/link';
import React from 'react';

const CartInfo = () => {
  const { cart, calculateTotalPriceOfCart } = useCart();

  return (
    <div className='cart__info'>
      <h4 className='info__title'>Cart totals</h4>
      <div className='info__content'>
        <div className='info__item'>
          <p>Total</p>
          <p>${calculateTotalPriceOfCart()}</p>
        </div>
      </div>
      <Link href={APP_ROUTER.CHECKOUT}>
        <Button size='lg' disabled={cart.length === 0}>
          Check out
        </Button>
      </Link>
    </div>
  );
};

export default CartInfo;
