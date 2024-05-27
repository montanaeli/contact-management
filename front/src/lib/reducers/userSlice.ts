"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Contact {
  id: string;
  name: string;
  title: string;
  profilePicture: string;
  address: string[];
  phone: string;
  email: string;
}

interface UserState {
  name: string;
  contacts: Contact[];
  contactById: Contact;
}

const initialState: UserState = {
  name: "",
  contacts: [],
  contactById: {
    id: "",
    name: "",
    title: "",
    profilePicture: "",
    address: [],
    phone: "",
    email: "",
  },
};

const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    loggedUser(state, action: PayloadAction<{ name: string }>) {
      state.name = action.payload.name;
    },
    addContact(state, action: PayloadAction<Contact>) {
      state.contacts.push(action.payload);
    },
    getContactById(state, action: PayloadAction<string>) {
      const contactId = action.payload;
      console.log("user slice id", contactId);
      const contact = state.contacts.find(
        (contact) => contact.id === contactId
      );
      console.log("user slice", contact);

      if (contact) {
        state.contactById = contact;
      } else {
        state.contacts = [];
      }
    },
  },
});

export const { loggedUser, addContact, getContactById } = userSlice.actions;
export default userSlice.reducer;
