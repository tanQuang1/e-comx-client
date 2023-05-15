import useCart from '@/hooks/useCart';
import { APP_LOCAL_STORAGE, APP_ROUTER } from '@/utils/app-config';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export default function OrderSuccessTemplate() {
  const [seconds, setSeconds] = useState<number>(5);
  const { resetCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      const isSuccess = localStorage.getItem(APP_LOCAL_STORAGE.IS_ORDER_SUCCESS);
      if (isSuccess) {
        resetCart();
        localStorage.removeItem(APP_LOCAL_STORAGE.IS_ORDER_SUCCESS);
      } else {
        router.push(APP_ROUTER.NOT_FOUND);
      }
    }
  }, []);
  useEffect(() => {
    const time = setTimeout(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    if (seconds === 0) {
      router.push(APP_ROUTER.INDEX);
      clearTimeout(time);
      return;
    }
    return () => clearTimeout(time);
  }, [seconds]);
  return (
    <div className='success-payment'>
      <div className='success-payment__time'>
        <span>{seconds}</span>
      </div>
      <div className='success-payment__content'>
        <h1>Thank You!</h1>
        <h5>Your order has been complete.</h5>
        <p>You will redirected to the home page shortly</p>
        <p>or click here to return to home page</p>
        <Link href={APP_ROUTER.INDEX}>
          <Icon icon='ic:home'></Icon>
          Go To Home
        </Link>
      </div>
    </div>
  );
}
