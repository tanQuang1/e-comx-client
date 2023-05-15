import { createSlice, AnyAction, PayloadAction } from '@reduxjs/toolkit';
// import { UserStateType } from './user.type';
import api from '@/services';
// import { AddressType } from '@/types/user.type';

const initialState: any = {
  userDetail: null,
  isLoading: false,
  userList: [],
  totalRows: 0,
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    resetUserDetail: (state: any) => {
      state.userDetail = null;
    },
    setUserList: (state: any, action: PayloadAction<[]>) => {
      state.userList = action.payload;
    },
    setTotalRows: (state: any, action: PayloadAction<number>) => {
      state.totalRows = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.login.matchFulfilled, (state: any, { payload }: AnyAction) => {
      if (payload.success && payload.user) {
        localStorage.setItem('token', payload.token);
        state.userDetail = payload.user;
      }
    }),
      builder.addMatcher(
        api.endpoints.getUserDetail.matchFulfilled,
        (state: any, { payload }: AnyAction) => {
          state.userDetail = payload.user;
        },
      );
  },
});
export const { setUserList, setTotalRows, resetUserDetail } = userSlice.actions;

export default userSlice.reducer;
