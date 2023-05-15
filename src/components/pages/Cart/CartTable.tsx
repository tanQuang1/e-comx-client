/* eslint-disable prettier/prettier */
import React from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import QuantityTextField from '../../ui/QuantityTextField';
import Button from '@/components/ui/Button';
import useCart from '@/hooks/useCart';
import { ProductDataType } from '@/types/product.type';
import { formatNumber } from '@/utils/helper';
import { CartItemType } from '@/store/app/app.type';
import { APP_ROUTER } from '@/utils/app-config';
import Link from 'next/link';
import { toast } from 'react-toastify';

const CartTable = () => {
  const {
    cart,
    entryQuantity,

    updateCart,
    removeProductOnCart,
  } = useCart();
  const changeQuantity = (value: number, product: ProductDataType) => {
    if (value === 0) return;
    entryQuantity(product, value);
  };

  const calculateTotalPriceOfCartOfProduct = (item: CartItemType) => {
    return formatNumber(item.product.price * item.quantity);
  };
  return (
    <div className='cart__table'>
      {cart.length === 0 ? (
        <div className='cart__empty'>
          <h3>Your cart is empty</h3>
        </div>
      ) : (
        <table>
          <thead>
            <td></td>
            <td>Product</td>
            <td>Price</td>
            <td>Quantity</td>
            <td>Total</td>
          </thead>
          <tbody>
            {cart &&
              cart.map((item) => (
                <tr key={item.product._id}>
                  <td className='cart__table-cell'>
                    <div className='table-cell__wrapper'>
                      <h4>Remove</h4>
                      <Icon
                        icon='ph:x-bold'
                        onClick={() => removeProductOnCart(item.product._id)}
                      />
                    </div>
                  </td>
                  <td className='cart__table-cell'>
                    <div className='table-cell__wrapper'>
                      <h4>Product</h4>
                      <div className='product__wrapper'>
                        <Image
                          width={70}
                          height={70}
                          src={item.product.images[0].url}
                          alt={item.product.name}
                        />
                        <p>{item.product.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className='cart__table-cell'>
                    <div className='table-cell__wrapper'>
                      <h4>Price</h4>
                      <p>${formatNumber(item.product.price)}</p>
                    </div>
                  </td>
                  <td className='cart__table-cell'>
                    <div className='table-cell__wrapper'>
                      <h4>Quantity</h4>
                      <div className='quantity__wrapper'>
                        <QuantityTextField
                          quantity={item.quantity}
                          onChange={(value: number) => changeQuantity(value, item.product)}
                        />
                      </div>
                    </div>
                  </td>
                  <td className='cart__table-cell'>
                    <div className='table-cell__wrapper'>
                      <h4>Total</h4>
                      <p>${calculateTotalPriceOfCartOfProduct(item)}</p>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
      <div className='cart__button__wrapper'>
        <Link href={APP_ROUTER.PRODUCT_LIST}>
          <Button size='lg' className='cart__button'>
            CONTINUE SHOPPING
          </Button>
        </Link>
        {cart.length !== 0 ? (
          <Button
            size='lg'
            className='cart__button'
            onClick={() => {
              updateCart([]);
              toast('Clear shopping cart successfully!', { type: 'success' });
            }}
          >
            CLEAR SHOPPING CART
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default CartTable;
