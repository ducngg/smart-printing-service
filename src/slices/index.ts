import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import LoginReducer from './auth/login/reducer';
import LayoutReducer from './layouts/reducer';

export const store = configureStore({
  reducer: {
    Layout: LayoutReducer,
    Login: LoginReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
