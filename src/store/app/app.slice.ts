import { ProductDataType } from './../../types/product.type';
import { AnyAction, PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ModalNameEnum, type AppState, type CartItemType } from './app.type';
import api from '@/services';
import { toast } from 'react-toastify';

const initialState: AppState = {
  brands: [],
  categoryList: [],
  cart: [],
  modal: {
    isOpen: false,
    name: ModalNameEnum.EMPTY,
  },
};

type incrementProductPayload = {
  product: ProductDataType;
  quantity: number;
};

export const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    setCart: (state: AppState, { payload }: PayloadAction<CartItemType[]>) => {
      state.cart = payload;
    },
    reset: (state: AppState) => {
      state.cart = [];
    },
    updateProductQuantity: (
      state: AppState,
      { payload: { product, quantity } }: PayloadAction<incrementProductPayload>,
    ) => {
      const index = state.cart.findIndex((item) => item.product._id === product._id);
      if (index !== -1) {
        state.cart[index].quantity = quantity;
        toast('Cập nhập giỏ hàng thành công', { type: 'success' });
      } else {
        state.cart.push({ product, quantity });
        toast('Thêm sản phẩm vào giỏ hàng', { type: 'success' });
      }
    },
    incrementProduct: (
      state: AppState,
      { payload: { product, quantity } }: PayloadAction<incrementProductPayload>,
    ) => {
      const index = state.cart.findIndex((item) => item.product._id === product._id);
      if (index !== -1) {
        state.cart[index].quantity += quantity;
        toast('Cập nhập giỏ hàng thành công', { type: 'success' });
      } else {
        state.cart.push({ product, quantity });
        toast('Thêm sản phẩm vào giỏ hàng', { type: 'success' });
      }
    },
    updateModal: (
      state: AppState,
      {
        payload,
      }: PayloadAction<{
        isOpen: boolean;
        name: ModalNameEnum;
      }>,
    ) => {
      state.modal = {
        ...payload,
        name: !payload.isOpen ? state.modal.name : payload.name,
      };
    },

    decrementProduct: (state: AppState, { payload }: PayloadAction<ProductDataType>) => {
      const index = state.cart.findIndex((item) => item.product._id === payload._id);
      if (index !== -1) {
        state.cart[index].quantity -= 1;
        if (state.cart[index].quantity === 0) {
          state.cart.splice(index, 1);
          toast('Xóa sản phẩm trong giỏ hàng', { type: 'success' });
          return;
        }
        toast('Cập nhập giỏ hàng thành công', { type: 'success' });
      }
    },
    deleteFromCart: (state: AppState, { payload }: PayloadAction<string>) => {
      state.cart = state.cart.filter((item) => item.product._id !== payload);
      toast('Xóa sản phẩm trong giỏ hàng', { type: 'success' });
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.fetchAllCategory.matchFulfilled,
      (state: AppState, { payload }: AnyAction) => {
        if (payload.success) {
          state.categoryList = payload.categories;
        }
      },
    );
    builder.addMatcher(
      api.endpoints.fetchAllBrands.matchFulfilled,
      (state: AppState, { payload }: AnyAction) => {
        if (payload.success) {
          state.brands = payload.brands;
        }
      },
    );
  },
});
export const {
  deleteFromCart,
  setCart,
  reset,
  incrementProduct,
  decrementProduct,
  updateModal,
  updateProductQuantity,
} = appSlice.actions;
export default appSlice.reducer;
