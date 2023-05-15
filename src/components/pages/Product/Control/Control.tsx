import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import { APP_ICONS } from '@/utils/app-config';
import { Icon } from '@iconify/react';
import React from 'react';
import { ColumnStateType } from '../ProductTemplate';

const sortOptionList = [
  { _id: '0', name: 'Select a option' },
  { _id: '1', name: 'Best Selling' },
  { _id: '2', name: 'Price, low to high' },
];

export enum SortOptionListEnum {
  ALL = 'Select a option',
  BEST_SELLING = 'Best Selling',
  PRICE_LOW_HIGH = 'Price, low to high',
}
interface ControlProps {
  onOpenFilter: () => void;
  onChangeViewing: (column: string) => void;
  activeCol: ColumnStateType;
  totalProduct: number | undefined;
  totalProductFetched: number;
  onChangeFetchBy: (value: string) => void;
  fetchBy: string;
}

function Control(props: ControlProps) {
  const {
    onOpenFilter,
    onChangeViewing,
    activeCol,
    totalProductFetched,
    totalProduct,
    fetchBy,
    onChangeFetchBy,
  } = props;

  return (
    <div className='control__box'>
      <div className='filter__box'>
        <Button
          className='filter__button'
          type='button'
          color='quinary'
          size='sm'
          onClick={onOpenFilter}
        >
          <span>
            <Icon width={20} height={20} icon={APP_ICONS.filter}></Icon>
          </span>
          <p>FILTER</p>
        </Button>
        <p className='product-result-count'>
          Showing{' '}
          {totalProduct && totalProduct > totalProductFetched ? totalProductFetched : totalProduct}{' '}
          of {totalProduct} products
        </p>
      </div>
      {/* Here */}
      <div className='control__button'>
        <Button
          onClick={() => onChangeViewing('two')}
          className={`btn ${activeCol.col === 'two' ? 'active' : ''}`}
          size='icon'
          color='secondary'
        >
          <Icon icon={APP_ICONS.twocol} />
        </Button>
        <Button
          onClick={() => onChangeViewing('three')}
          className={`btn ${activeCol.col === 'three' ? 'active' : ''}`}
          size='icon'
          color='secondary'
        >
          <Icon icon={APP_ICONS.threecol} />
        </Button>
        <Button
          onClick={() => onChangeViewing('four')}
          className={`btn ${activeCol.col === 'four' ? 'active' : ''}`}
          size='icon'
          color='secondary'
        >
          <Icon icon={APP_ICONS.fourcol} />
        </Button>
        <Button
          onClick={() => onChangeViewing('five')}
          className={`btn ${activeCol.col === 'five' ? 'active' : ''}`}
          size='icon'
          color='secondary'
        >
          <Icon icon={APP_ICONS.fivecol} />
        </Button>
        <Button
          onClick={() => onChangeViewing('detail')}
          className={`btn ${activeCol.col === 'detail' ? 'active' : ''}`}
          size='icon'
          color='secondary'
        >
          <Icon icon={APP_ICONS.detailview} />
        </Button>
      </div>
      <Select
        className='filter--choice'
        size='sm'
        options={sortOptionList}
        value={fetchBy}
        onSelect={onChangeFetchBy}
      />
    </div>
  );
}

export default React.memo(Control);
