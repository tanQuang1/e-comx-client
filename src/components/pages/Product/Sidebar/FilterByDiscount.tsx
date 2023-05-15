import { DISCOUNT_OPTIONS } from '@/utils/app-config';
import React from 'react';
import FilterCollection from './FilterCollection';

function FilterByDiscount() {
  const discountList = DISCOUNT_OPTIONS;
  return (
    <>
      <FilterCollection filterList={discountList} />
    </>
  );
}

export default FilterByDiscount;
