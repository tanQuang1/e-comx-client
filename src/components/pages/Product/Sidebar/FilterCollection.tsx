import { SubcategoryDataType } from '@/types/app.type';
import { APP_ICONS } from '@/utils/app-config';
import { Icon } from '@iconify/react';
import React, { useState } from 'react';

interface FilterCollectionPropsType {
  filterList?: string[];
  subCategoryList?: SubcategoryDataType[];
}

function FilterCollection(props: FilterCollectionPropsType) {
  const [activeIndex, setActiveIndex] = useState<number>();
  const [value, setValue] = useState<string>('');
  const { filterList, subCategoryList } = props;
  const handleItemClick = (e: React.MouseEvent<HTMLLIElement>, index: number, item: string) => {
    e.preventDefault();
    if (activeIndex === index) {
      setActiveIndex(undefined);
      setValue('');
    } else {
      setActiveIndex(index);
      setValue(item);
    }
  };
  console.log(value);

  return (
    <ul className='collection-filters'>
      {filterList &&
        filterList.map((item: string, index: number) => (
          <li
            className={'input-checkbox'}
            key={item}
            onClick={(e) => handleItemClick(e, index, item)}
          >
            <a href='#' className={`link ${activeIndex === index ? 'active' : ''}`}>
              <span className='filter-icon'>
                <Icon icon={APP_ICONS.check} />
              </span>
              <span className='filter-title'>{item}</span>
            </a>
          </li>
        ))}
      {subCategoryList &&
        subCategoryList.map((item: SubcategoryDataType, index: number) => (
          <li
            className='input-checkbox'
            key={item.name}
            onClick={(e) => handleItemClick(e, index, item.name)}
          >
            <a href='#' className={`link ${activeIndex === index ? 'active' : ''}`}>
              <span className='filter-icon'>
                <Icon icon={APP_ICONS.check} />
              </span>
              <span className='filter-title'>{item.name}</span>
            </a>
          </li>
        ))}
    </ul>
  );
}

export default React.memo(FilterCollection);
