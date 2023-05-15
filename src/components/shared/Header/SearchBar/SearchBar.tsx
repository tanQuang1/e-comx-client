import Button from '@/components/ui/Button';
import TextField from '@/components/ui/TextField';
import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import Select from '@/components/ui/Select';
import LoadingBar from '@/components/ui/LoadingBar';
import { ProductDetailData } from '@/temp/ProductDetailData';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
export default function SearchBar() {
  const [select, setSelect] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState<string>('');
  const categoryList = useSelector((state: RootState) => state.app.categoryList);
  const handleSelect = (value: string) => {
    setSelect(value);
  };

  useEffect(() => {
    if (text === '') return setOpen(false);
    if (!open) {
      setOpen(true);
    }

    setIsLoading(true);

    const time = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(time);
    };
  }, [text]);
  const handleChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  return (
    <div className='header__search'>
      <Select
        className='header__select'
        size='lg'
        options={categoryList}
        placeholder='All Categories'
        value={select}
        onSelect={handleSelect}
      />
      <div className='header__input'>
        <form className='form'>
          <TextField placeholder='Search for products...' onChange={handleChangeSearchText} />
          <Button color='primary' size='icon'>
            <Icon icon='ri:search-line' width='20' height='20' />
          </Button>
        </form>
        {
          <div className={`${open ? 'open' : ''}__result fix__scroll modal`}>
            <div className='modal__content'>
              {isLoading && (
                <div className='loading'>
                  <LoadingBar />
                </div>
              )}
              {ProductDetailData && (
                <div className='product__item'>
                  <div className='product--image'>
                    <Image
                      fill={true}
                      sizes='30px,30px'
                      src={ProductDetailData.images[0].url}
                      alt={ProductDetailData.name}
                    />
                  </div>
                  <div className='product__content'>
                    <a className='product--title'>{ProductDetailData.name}</a>
                    <p className='product--price'>${ProductDetailData.price}</p>
                  </div>
                </div>
              )}
              {/* <div>There are no products that match your price</div> */}
            </div>
          </div>
        }
      </div>
    </div>
  );
}
