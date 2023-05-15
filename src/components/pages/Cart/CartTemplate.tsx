import React from 'react';
import CartTable from './CartTable';
import CartInfo from './CartInfo';
import useCart from '@/hooks/useCart';

const CartTemplate = () => {
  const { cart } = useCart();
  return (
    <div className='cart'>
      <div className='cart__header'>
        <div className='cart__breadcrumb'>
          <h2>Cart</h2>
        </div>
      </div>
      <div className='cart__content'>
        <CartTable />
        {cart.length === 0 ? null : <CartInfo />}
      </div>
    </div>
  );
};

export default CartTemplate;
