import { CategoryDataType, SubcategoryDataType } from '@/types/app.type';
import { APP_ICONS, APP_ROUTER } from '@/utils/app-config';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import React from 'react';

interface SubCategoryPropsType extends React.HTMLAttributes<HTMLUListElement> {
  category: CategoryDataType | null;
  removePickedCategory: () => void;
}

function SubCategory(props: SubCategoryPropsType) {
  const { category, removePickedCategory, ...rest } = props;
  return (
    <ul className='menu menu--subcategory' {...rest}>
      <li className='menu__items' onClick={removePickedCategory}>
        <Icon width={24} height={24} className='icon' icon={APP_ICONS.arrowBackSpace} />
      </li>
      {category &&
        category.subcategory.map((subcategory: SubcategoryDataType) => (
          <li key={subcategory._id} className='menu__items'>
            <Link
              className='menu__links'
              href={{
                pathname: APP_ROUTER.PRODUCT_LIST,
                query: { subcategory: subcategory._id, pageName: subcategory.name.toUpperCase() },
              }}
            >
              {subcategory.name}
            </Link>
          </li>
        ))}
    </ul>
  );
}

export default React.memo(SubCategory);
