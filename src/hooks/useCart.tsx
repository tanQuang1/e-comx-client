import { RootState } from '@/store';
import {
  setCart,
  incrementProduct,
  decrementProduct,
  deleteFromCart,
  reset,
  updateProductQuantity,
} from '@/store/app/app.slice';
import { CartItemType } from '@/store/app/app.type';
import { ProductDataType } from '@/types/product.type';
import { formatNumber } from '@/utils/helper';
import { useDispatch, useSelector } from 'react-redux';

export default function useCart() {
  const cart = useSelector((state: RootState) => state.app.cart);
  const dispatch = useDispatch();

  const updateCart = (data: CartItemType[]) => {
    dispatch(setCart(data));
  };
  const resetCart = () => {
    dispatch(reset());
  };
  const incrementProductOnCart = (product: ProductDataType, quantity: number) => {
    dispatch(incrementProduct({ product, quantity }));
  };
  const entryQuantity = (product: ProductDataType, quantity: number) => {
    dispatch(updateProductQuantity({ product, quantity }));
  };

  const decrementProductOnCart = (product: ProductDataType) => {
    dispatch(decrementProduct(product));
  };

  const removeProductOnCart = (product_id: string) => {
    dispatch(deleteFromCart(product_id));
  };

  const calculateAmountProductsInCart = () => {
    if (!cart) return 0;
    return cart.reduce((acc: number, item: CartItemType) => {
      return acc + item.quantity;
    }, 0);
  };

  const calculateTotalPriceOfCart = () => {
    if (!cart) return 0;
    const total = cart.reduce((acc: number, item: CartItemType) => {
      return acc + item.quantity * item.product.price;
    }, 0);
    return formatNumber(total);
  };

  const amountProductInCart = () => {
    if (!cart) return 0;

    return cart.reduce((acc: number, item: CartItemType) => acc + item.quantity, 0);
  };
  return {
    resetCart,
    incrementProductOnCart,
    decrementProductOnCart,
    removeProductOnCart,
    cart,
    updateCart,
    calculateAmountProductsInCart,
    calculateTotalPriceOfCart,
    amountProductInCart,
    entryQuantity,
  };
}
