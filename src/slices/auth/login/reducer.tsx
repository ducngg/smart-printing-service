import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from 'types';

type LoginState = {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
};

export const initialState: LoginState = {
  user: null,
  loading: true,
  isAuthenticated: false,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<LoginState['user']>) {
      state.user = action.payload;
      state.loading = false;
      state.isAuthenticated = true;
    },
    logoutUserSuccess(state) {
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
    },
  },
});
export const { loginSuccess, logoutUserSuccess } = loginSlice.actions;
export default loginSlice.reducer;
