import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sessionAuthDataHandler } from '../../helpers/sessionAuthDataHandler';

export type AuthState = {
  jwtToken: string;
  refreshToken: string;
};

const initialState: AuthState = sessionAuthDataHandler.getTokens();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      { payload: { jwtToken, refreshToken } }: PayloadAction<AuthState>
    ) => {
      state.jwtToken = jwtToken;
      state.refreshToken = refreshToken;
    },
    logOut: (state) => {
      state.jwtToken = '';
      state.refreshToken = '';
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export const authReducer = authSlice.reducer;
