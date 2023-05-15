import { RATING_OPTIONS } from '@/utils/app-config';
import React from 'react';
import FilterCollection from './FilterCollection';

const FilterByRatings = () => {
  const ratingList = RATING_OPTIONS;
  return (
    <>
      <FilterCollection filterList={ratingList} />
    </>
  );
};

export default FilterByRatings;
