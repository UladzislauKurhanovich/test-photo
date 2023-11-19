import {
  Action,
  configureStore,
  ThunkAction
} from '@reduxjs/toolkit';

import { commentsApi } from './slices/commentsApi';
import { imageApi } from './slices/imageApi';
import { userApi } from './slices/userApi';

export const store = configureStore({
  reducer: {
    [imageApi.reducerPath]: imageApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      imageApi.middleware,
      commentsApi.middleware,
      userApi.middleware,
    ),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type AppDispatch = typeof store.dispatch;
