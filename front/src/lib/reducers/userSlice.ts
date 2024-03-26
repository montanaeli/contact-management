"use client";

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface userState {
  name: string | null;
  contacts: string[] | null;
}

const initialState: userState = {
  name: null,
  contacts: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setUserContacts(state, action: PayloadAction<string[]>) {
      state.contacts = action.payload;
    }
  },
});

export const { setUserName, setUserContacts } = userSlice.actions;
export default userSlice.reducer;