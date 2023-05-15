import Barges from '@/components/ui/Badge';
import { APP_ICONS, APP_ROUTER } from '@/utils/app-config';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { memo } from 'react';

function StickyMobile() {
  const router = useRouter();

  return (
    <div className={`sticky-mobile ${router.asPath === 'products' ? 'open' : ''}`}>
      <ul>
        <li>
          <Link href={APP_ROUTER.INDEX}>
            <Icon icon={APP_ICONS.home} />
          </Link>
        </li>
        <li>
          <Icon icon={APP_ICONS.productAll} />
        </li>
        <li>
          <Icon icon={APP_ICONS.cart} />
        </li>
        <li>
          <Icon icon={APP_ICONS.heart} />
          <Barges value={3} size='sm' />
        </li>
        <li>
          <Icon icon={APP_ICONS.account} />
        </li>
      </ul>
    </div>
  );
}

export default memo(StickyMobile);
