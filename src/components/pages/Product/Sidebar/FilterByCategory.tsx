import { CategoryDataType } from '@/types/app.type';
import FilterCollection from './FilterCollection';

interface FilterByCategoryPropsType {
  categoryList: CategoryDataType[];
}
export default function FilterByCategory(props: FilterByCategoryPropsType) {
  const { categoryList } = props;
  return (
    <>
      {categoryList.map((item: CategoryDataType) => (
        <div className='category-checkbox' key={item._id}>
          <p className='category__name'>{item.name}</p>
          <FilterCollection subCategoryList={item.subcategory} />
        </div>
      ))}
    </>
  );
}
