import QuantityTextField from '@/components/ui/QuantityTextField';
import useCart from '@/hooks/useCart';
import { ProductDataType } from '@/types/product.type';
import { APP_ICONS, APP_ROUTER } from '@/utils/app-config';
import { formatNumber } from '@/utils/helper';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
  product: ProductDataType;
  quantity: number;
};
function ProductInfo({ product, quantity }: Props) {
  const { entryQuantity, removeProductOnCart } = useCart();

  const changeQuantity = (value: number) => {
    if (quantity === 0) return;

    entryQuantity(product, value);
  };

  return (
    <li className='product-items'>
      <Icon
        width={20}
        height={20}
        icon={APP_ICONS.delete}
        className='icon-delete'
        onClick={() => removeProductOnCart(product._id)}
      />
      <Link href={`${APP_ROUTER.PRODUCT_LIST}/${product._id}`} className='product-links'>
        <aside className='product__image'>
          <Image width={80} height={80} src={product.images[0].url} alt={product.name} />
        </aside>
      </Link>
      <aside className='product__detail'>
        <Link href={`${APP_ROUTER.PRODUCT_LIST}/${product._id}`} className='product-links'>
          <p className='product__name'>{product.name}</p>
        </Link>
        <div className='product__quantity'>
          <aside className='quantity'>
            <span className='quantity__number'>{quantity} X</span>
            <span className='quantity__price'>${formatNumber(product.price)}</span>
          </aside>
          <QuantityTextField size='sm' quantity={quantity} onChange={changeQuantity} />
        </div>
      </aside>
    </li>
  );
}

export default React.memo(ProductInfo);
