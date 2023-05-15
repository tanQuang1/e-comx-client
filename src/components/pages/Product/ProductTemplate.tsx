// import Modal from '@/components/ui/Modal';
import Loading from '@/components/ui/Loading';
import api from '@/services';
import { useEffect, useMemo, useState } from 'react';
import Control, { SortOptionListEnum } from './Control/Control';
import { Hero } from './Hero/Hero';
import ProductCollection from './ProductCollection/ProductCollection';
import { useRouter } from 'next/router';
import Sidebar from './Sidebar/Sidebar';
export interface ColumnStateType {
  col: string;
}
const initColumnState: ColumnStateType = {
  col: 'four',
};
export default function ProductTemplate() {
  const {
    query: { subcategory, pageName },
  } = useRouter();
  const [loadMore, setLoadMore] = useState({ num: 12, time: 1 });
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [activeCol, setActiveCol] = useState<ColumnStateType>(initColumnState);
  const [fetchBy, setFetchBy] = useState<string>(SortOptionListEnum.ALL);
  const calculateTotalProductFetched = () => {
    return loadMore.num * loadMore.time;
  };

  const changeFetchBy = (value: string) => {
    setFetchBy(value);
  };
  const { data, isLoading, isFetching } = api.useFetchAllProductQuery(
    {
      limit: calculateTotalProductFetched(),
      subcategoryId: subcategory ? subcategory : '',
    },
    {
      skip: fetchBy !== SortOptionListEnum.ALL,
    },
  );
  const dataBestSellingProduct = api.useFetchBestSellingProductQuery(
    calculateTotalProductFetched(),
    {
      skip: fetchBy !== SortOptionListEnum.BEST_SELLING,
    },
  );

  const currentData = useMemo(() => {
    switch (fetchBy) {
      case SortOptionListEnum.BEST_SELLING:
        return dataBestSellingProduct && dataBestSellingProduct.data;
      case SortOptionListEnum.ALL:
        return data;

      default:
        return {
          products: [],
          totalRows: 0,
        };
    }
  }, [fetchBy, data, dataBestSellingProduct]);

  useEffect(() => {
    if (activeCol.col === 'five') {
      setLoadMore({ ...loadMore, num: 15 });
    } else {
      setLoadMore({ ...loadMore, num: 12 });
    }
  }, [activeCol]);

  const toggleSideBarModal = () => {
    setIsOpenFilter(!isOpenFilter);
  };
  const changeLoadMoreTime = () => {
    setLoadMore({ ...loadMore, time: loadMore.time + 1 });
  };
  const handleChangeActiveColumn = (column: string) => {
    setActiveCol({ col: column });
  };

  if (isLoading) return <Loading position='absolute' />;

  console.log(currentData && currentData?.products.length !== 0);

  return (
    <>
      <div className='page__product'>
        <div className='main--content'>
          <Sidebar open={isOpenFilter} onClose={toggleSideBarModal} />

          <div className='content--box'>
            {currentData && currentData?.products.length !== 0 ? (
              <>
                <Hero pageName={pageName ? pageName : ''} />
                <Control
                  onChangeViewing={handleChangeActiveColumn}
                  onOpenFilter={toggleSideBarModal}
                  activeCol={activeCol}
                  totalProduct={
                    currentData?.totalRows ? currentData?.totalRows : currentData?.products.length
                  }
                  totalProductFetched={calculateTotalProductFetched()}
                  onChangeFetchBy={changeFetchBy}
                  fetchBy={fetchBy}
                />
                <ProductCollection
                  loading={isFetching}
                  currentData={currentData?.products}
                  column={activeCol.col}
                  onChangeLoadMoreTime={changeLoadMoreTime}
                  btnLoadMoreDisabled={
                    currentData ? calculateTotalProductFetched() < currentData.totalRows : false
                  }
                  totalProductFetched={calculateTotalProductFetched()}
                  totalProduct={
                    currentData?.totalRows ? currentData?.totalRows : currentData?.products.length
                  }
                />
              </>
            ) : (
              <h1 className='not-found-message'>Not found product</h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
