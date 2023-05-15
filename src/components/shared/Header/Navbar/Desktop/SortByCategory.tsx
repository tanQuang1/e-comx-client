import { RootState } from '@/store';
import { CategoryDataType, SubcategoryDataType } from '@/types/app.type';
import { APP_ROUTER } from '@/utils/app-config';
import Link from 'next/link';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

interface SortBycategoryPropsType extends React.HTMLAttributes<HTMLDataListElement> {
  toggleDropDown: () => void;
}

function SortByCategory(props: SortBycategoryPropsType) {
  const categoryList = useSelector((state: RootState) => state.app.categoryList);
  const { toggleDropDown, ...rest } = props;
  const [categoryId, setCategoryId] = useState<string>('');

  console.log('categoryId', categoryId);

  return (
    <nav className='sort-by-category__dropdown' {...rest}>
      <span className='overlay' onClick={toggleDropDown}></span>
      <ul className='category-list'>
        {categoryList.map((category: CategoryDataType) => (
          <li
            key={category._id}
            className='category-list__items'
            onMouseOver={() => {
              setCategoryId(category._id);
            }}
            onMouseOut={() => setCategoryId('')}
          >
            <p className='category__links'>{category.name}</p>
            {category.subcategory.length > 0 && (
              <div className={`sub-category ${category._id === categoryId ? 'active' : ''}`}>
                <ul className='sub-category-list'>
                  {category.subcategory.map((subcategory: SubcategoryDataType) => (
                    <li key={subcategory._id} className='sub-category-list__items '>
                      <Link
                        href={{
                          pathname: APP_ROUTER.PRODUCT_LIST,
                          query: {
                            subcategory: subcategory._id,
                            pageName: subcategory.name.toUpperCase(),
                          },
                        }}
                      >
                        {subcategory.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default React.memo(SortByCategory);
