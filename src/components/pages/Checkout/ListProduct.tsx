import Button from '@/components/ui/Button';
import TextField from '@/components/ui/TextField';
import useCart from '@/hooks/useCart';
import { formatNumber } from '@/utils/helper';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import api from '@/services';
import { toast } from 'react-toastify';
import { Icon } from '@iconify/react';
import { APP_ICONS } from '@/utils/app-config';
interface ListProductPropsType {
  value: string;
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleBlur: (e: React.FocusEvent<any, Element>) => void;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}
export default function ListProduct(props: ListProductPropsType) {
  const { cart, calculateTotalPriceOfCart } = useCart();
  const { value, handleChange, handleBlur, setFieldValue, ...rest } = props;
  const [activeDiscount, setActiveDiscount] = useState<number>(0);
  const [checkCoupon] = api.useCheckCouponMutation();
  const [preventCoupon, setPreventCoupon] = useState<string>('');
  const [stateApply, setStateApply] = useState<boolean>(false);
  useEffect(() => {
    if (preventCoupon !== value && value !== '') {
      setStateApply(true);
    } else {
      setStateApply(false);
    }
  }, [value, preventCoupon]);
  const checkDiscount = () => {
    checkCoupon(value)
      .then((results) => {
        setPreventCoupon(value);
        setStateApply(false);
        if ('data' in results) {
          const { data } = results;
          toast('Áp mã thành công', { type: 'success' });
          setActiveDiscount(data.discount);
        } else {
          toast('Áp mã thất bại!', { type: 'error' });
          setActiveDiscount(0);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const calculateTotal = () => {
    const totalPriceOfCart = calculateTotalPriceOfCart();
    if (totalPriceOfCart && activeDiscount !== 0) {
      const covertTotalPriceOfCart = Number(totalPriceOfCart.replace(/,/g, ''));
      return formatNumber(covertTotalPriceOfCart - (covertTotalPriceOfCart * activeDiscount) / 100);
    } else {
      return totalPriceOfCart;
    }
  };
  return (
    <div className='productCheckout' {...rest}>
      <div className='productCheckout__summary'>
        {cart.map((value, index) => {
          return (
            <div key={index} className='summary__item'>
              <div className='item__detail'>
                <div className='detail--image'>
                  <Image
                    width={70}
                    height={70}
                    src={value.product.images[0].url}
                    alt={value.product.name}
                  />
                  <p className='quantity'>{value.quantity}</p>
                </div>
                <div className='detail--information'>
                  <div className='information--name'>{value.product.name}</div>
                  <div className='information--style'>{value.product.brand}</div>
                </div>
              </div>
              <div className='item__price'>₫{formatNumber(value.product.price)}</div>
            </div>
          );
        })}
      </div>
      <div className='productCheckout__discount'>
        <div className='discount--field'>
          <TextField
            label='Discount code'
            labelPosition='inline'
            name='coupon'
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div className='discount--button'>
          <Button
            size='lg'
            disabled={stateApply ? false : true}
            onClick={checkDiscount}
            type='button'
          >
            Apply
          </Button>
        </div>
      </div>
      <div className='productCheckout__price'>
        <div className='price price--subtotal'>
          <p className='subtotal__title'>Subtotal</p>
          <p className='subtotal__price'>₫{calculateTotalPriceOfCart()}</p>
        </div>
        {activeDiscount !== 0 ? (
          <div className='price price--discount'>
            <p className='discount__title'>
              <span>Discount </span>
            </p>

            <p className='discount__price'>
              {`${activeDiscount} %`}{' '}
              <Icon
                width={20}
                height={20}
                icon={APP_ICONS.delete}
                className='icon-delete'
                onClick={() => {
                  setActiveDiscount(0);
                  setFieldValue('coupon', '');
                  setPreventCoupon('');
                }}
              />
            </p>
          </div>
        ) : null}
        <div className='price price--total'>
          <p className='total__title'>Total</p>
          <p className='total__price'>
            {' '}
            <span>₫</span> {`${calculateTotal()}`}
          </p>
        </div>
      </div>
    </div>
  );
}
