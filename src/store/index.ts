import api from '@/services';
import appReducer from './app/app.slice';
import userReducer from './user/user.slice';
import { Middleware, configureStore, isRejectedWithValue } from '@reduxjs/toolkit';

// import { setupListeners } from '@reduxjs/toolkit/dist/query';
export const rtkQueryErrorMiddleware: Middleware = () => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  if (isRejectedWithValue(action)) {
    if ('status' in action.payload.data) {
      if (action.payload.data.status === 401) {
        // handle logout
        console.log('log out');
      }
    }
  }
  return next(action);
};
export const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([api.middleware, rtkQueryErrorMiddleware]);
  },
  devTools: true,
});

// setupListeners(store.dispatch);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
