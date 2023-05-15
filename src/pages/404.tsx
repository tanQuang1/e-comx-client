import { Icon } from '@iconify/react';
import img_page404 from '@/assets/images/img_page404.svg';
import Image from 'next/image';
import Link from 'next/link';
import { APP_ROUTER } from '@/utils/app-config';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const NotFoundPage = () => {
  const [seconds, setSeconds] = useState<number>(5);
  const router = useRouter();

  useEffect(() => {
    const time = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    if (seconds === 0) {
      router.push(APP_ROUTER.INDEX);
      clearInterval(time);
      return;
    }
    return () => clearInterval(time);
  }, [seconds]);
  return (
    <div className='not-found'>
      <section className='not-found__image'>
        <Image src={img_page404} alt='' />
      </section>
      <section className='not-found__content'>
        <h1>404, PAGE NOT FOUND 😭</h1>
        <h5>Go to home page after {seconds}s</h5>
        <Link href={APP_ROUTER.INDEX}>
          <Icon icon='ic:home'></Icon>
          Back to previous page
        </Link>
      </section>
    </div>
  );
};
export default NotFoundPage;
