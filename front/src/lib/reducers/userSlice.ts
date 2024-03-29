"use client";

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface userState {
  name: string;
  contacts: string[] | null;
}

const initialState: userState = {
  name: "",
  contacts: null
};

const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    loggedUser(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setUserContacts(state, action: PayloadAction<string[]>) {
      state.contacts = action.payload;
    }
  },
});

export const { loggedUser, setUserContacts } = userSlice.actions;
export default userSlice.reducer;
