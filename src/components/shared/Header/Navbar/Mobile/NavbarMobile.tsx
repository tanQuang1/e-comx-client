import { RootState } from '@/store';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Logo from '../../Logo/Logo';
import TextField from '@/components/ui/TextField';
import { APP_ICONS } from '@/utils/app-config';
import { Icon } from '@iconify/react';
import { MENU_ITEMS } from '@/utils/constants';
import { useRouter } from 'next/router';
import { CategoryDataType, MenuItemsType } from '@/types/app.type';
import SubCategory from './SubCategory';
import useApp from '@/hooks/useApp';

function NavbarMobile() {
  const router = useRouter();
  const { closeModal } = useApp();
  const categoryList = useSelector((state: RootState) => state.app.categoryList);
  const [menuItemId, setMenuItemId] = useState<number[]>([]);
  const [pickedCategory, setPickedCategory] = useState<CategoryDataType | null>(null);
  const updateMenuItemId = (id: number) => {
    if (menuItemId.includes(id)) {
      setMenuItemId(menuItemId.filter((item) => item !== id));
      return;
    }
    setMenuItemId([...menuItemId, id]);
  };

  useEffect(() => {
    setPickedCategory(null);
    setMenuItemId([]);
  }, [router.asPath]);
  const pickCategory = (category: CategoryDataType) => {
    setPickedCategory(category);
  };

  const removePickedCategory = () => {
    setPickedCategory(null);
  };

  return (
    <div className='navbar-modal'>
      <Icon onClick={closeModal} className='close-icon' width={24} height={24} icon={APP_ICONS.X} />
      <Logo />
      <section className='search-bar'>
        <TextField type='text' placeholder='Search' className='search-bar__text-field' />
        <Icon className='search-bar__icon' width={24} height={24} icon={APP_ICONS.search} />
      </section>
      {!pickedCategory ? (
        <ul className='menu'>
          {MENU_ITEMS.map((item: MenuItemsType) => (
            <li
              key={item.id}
              className={`menu__items ${router.asPath === item.path ? 'active' : ''} ${
                menuItemId.includes(item.id) ? 'open' : ''
              }`}
            >
              <div className='menu__links' onClick={() => updateMenuItemId(item.id)}>
                {item.title}
                {item.subMenu && <Icon icon={APP_ICONS.arrowDown} width={16} height={16} />}
              </div>
              <div className='category'>
                <ul className='category-list'>
                  {categoryList.map((category: CategoryDataType) => (
                    <li
                      key={category._id}
                      className='category-list__items'
                      onClick={() => pickCategory(category)}
                    >
                      <div className='category-list__links '>
                        {category.name}
                        {category.subcategory.length > 0 && (
                          <Icon icon={APP_ICONS.arrowRight} width={16} height={16} />
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <SubCategory category={pickedCategory} removePickedCategory={removePickedCategory} />
      )}
    </div>
  );
}

export default React.memo(NavbarMobile);
