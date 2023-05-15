import api from '@/services';
import { APP_ICONS } from '@/utils/app-config';
import { Icon } from '@iconify/react';
import FilterBox from './FilterBox';
import FilterByBrand from './FilterByBrand';
import FilterByCategory from './FilterByCategory';
import FilterByDiscount from './FilterByDiscount';
import FilterByRatings from './FilterByRatings';
import React from 'react';
interface SidebarPropsType {
  open: boolean;
  onClose?: () => void;
}

function Sidebar(props: SidebarPropsType) {
  const { open, onClose } = props;
  const { data: categoryList } = api.useFetchAllCategoryQuery(undefined, {
    refetchOnFocus: false,
  });
  const { data: brand } = api.useFetchAllBrandsQuery(undefined, {
    refetchOnFocus: false,
  });

  return (
    <>
      <div className={`side-bar ${open ? 'open' : ''}`}>
        <div className='title--sidebar'>
          <h3>Filters</h3>
          <Icon icon={APP_ICONS.X} onClick={onClose} />
        </div>
        <div className='side-bar__container'>
          <FilterBox title='Product Category'>
            {categoryList && <FilterByCategory categoryList={categoryList.categories} />}
          </FilterBox>
          <FilterBox title='Filter By Brands'>
            {brand && <FilterByBrand brandList={brand.brands} />}
          </FilterBox>
          <FilterBox title='Filter By Discount'>
            <FilterByDiscount />
          </FilterBox>
          <FilterBox title='Filter By Ratings'>
            <FilterByRatings />
          </FilterBox>
        </div>
      </div>
      <div onClick={onClose} className={`mask--overlay overlay--${open ? 'open' : ''}`}></div>
    </>
  );
}

export default React.memo(Sidebar);
