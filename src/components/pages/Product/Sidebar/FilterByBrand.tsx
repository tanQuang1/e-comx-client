import React from 'react';
import FilterCollection from './FilterCollection';

export interface FilterByBrandPropsType {
  brandList: string[];
}

function FilterByBrand(props: FilterByBrandPropsType) {
  const { brandList } = props;
  return (
    <>
      <FilterCollection filterList={brandList} />
    </>
  );
}

export default FilterByBrand;
