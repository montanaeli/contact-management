"use client";

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  authToken: string | null;
}

const initialState: AuthState = {
  authToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userToken(state, action: PayloadAction<{authToken: string}>) {
      state.authToken = action.payload.authToken;
    },
  },
});

export const { userToken } = authSlice.actions;
export default authSlice.reducer;