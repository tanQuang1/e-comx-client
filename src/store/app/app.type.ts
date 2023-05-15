import { ProductDataType } from './../../types/product.type';
import { CategoryDataType } from '@/types/app.type';

export type CartItemType = {
  product: ProductDataType;
  quantity: number;
};

export type AppState = {
  brands: string[];
  categoryList: CategoryDataType[];
  cart: CartItemType[];
  modal: {
    isOpen: boolean;
    name: ModalNameEnum;
  };
};

export enum ModalNameEnum {
  EMPTY = '',
  CART = 'CART',
  WISH_LIST = 'WISH_LIST',
  AUTH = 'AUTH',
  MENU_BAR_MOBILE = 'MENU_BAR_MOBILE',
}
export enum ModalPlacementEnum {
  LEFT = 'left',
  RIGHT = 'right',
  CENTER = 'center',
  TOP = 'top',
}
