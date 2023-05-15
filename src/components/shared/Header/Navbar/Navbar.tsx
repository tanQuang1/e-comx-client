import { MenuItemsType } from '@/types/app.type';
import { APP_ICONS } from '@/utils/app-config';
import { MENU_ITEMS } from '@/utils/constants';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import SortByCategory from './Desktop/SortByCategory';
import useApp from '@/hooks/useApp';
import { ModalNameEnum } from '@/store/app/app.type';

export default function Navbar() {
  const router = useRouter();
  const { openModal } = useApp();
  const [openDropDown, setOpenDropDown] = useState<boolean>(false);

  const toggleDropDown = () => {
    setOpenDropDown(!openDropDown);
  };

  return (
    <>
      <nav className='header__navbar '>
        <section
          className='header__navbar--mobile'
          onClick={() => openModal(ModalNameEnum.MENU_BAR_MOBILE)}
        >
          <Icon width={25} height={25} icon={APP_ICONS.menubar} />
        </section>
        <section className='header__navbar--desktop'>
          <aside
            className={`sort-by-category ${openDropDown ? 'active' : ''}`}
            onClick={toggleDropDown}
          >
            <Icon width={30} height={30} icon={APP_ICONS.menubar} className='icon-menubar' />
            <Icon width={30} height={30} icon={APP_ICONS.X} className='icon-close' />
            <p className='sort-by-category__text'>SORT BY DEPARTMENT</p>
            <SortByCategory toggleDropDown={toggleDropDown} />
          </aside>
          <ul className='menu'>
            {MENU_ITEMS.map((item: MenuItemsType) => (
              <li
                key={item.id}
                className={`menu__items ${router.asPath === item.path ? 'active' : ''}`}
              >
                <Link href={item.path}>{item.title}</Link>
              </li>
            ))}
          </ul>
          <aside className='meta'>
            <p className='meta__content'>Spend $120 more and get free shipping!</p>
          </aside>
        </section>
      </nav>
    </>
  );
}
