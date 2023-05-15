import { MenuItemsType } from '@/types/app.type';
import { APP_ROUTER } from './app-config';
export const MENU_ITEMS: MenuItemsType[] = [
  {
    id: 1,
    title: 'Home',
    path: APP_ROUTER.INDEX,
    subMenu: false,
  },
  {
    id: 2,
    title: 'SHOP',
    path: APP_ROUTER.PRODUCT_LIST,
    subMenu: true,
  },
  {
    id: 3,
    title: 'About',
    path: APP_ROUTER.ABOUT,
    subMenu: false,
  },
  {
    id: 4,
    title: 'Contact',
    path: APP_ROUTER.CONTACT,
    subMenu: false,
  },
];
