import { Contact, User, users } from "../data/database";
import { v4 as uuidv4 } from "uuid";

export const getContacts = (userId: string): Contact[] => {
  const user = users.find((u) => u.id === userId);
  return user?.contacts || [];
};

export const getContactsByName = (
  id: string,
  name: string
): Contact[] | null => {
  const user = users.find((u) => u.id === id);
  if (!user) {
    return null;
  }

  const filteredContacts = user.contacts.filter((contact) =>
    contact.name.toLowerCase().includes(name.toLowerCase())
  );

  return filteredContacts.length > 0 ? filteredContacts : null;
};

export const createContact = (
  userId: string,
  name: string,
  title: string,
  profilePicture: string,
  phone: string,
  email: string
): Contact | null => {
  const user = users.find((u) => u.id === userId);
  if (!user) {
    return null;
  }

  const newContact: Contact = {
    id: uuidv4(),
    name,
    title,
    profilePicture,
    addressList: [],
    phone,
    email
  };

  user.contacts.push(newContact);
  return newContact;
};

export const getContactById = (
  userId: string,
  contactId: string
): Contact | null => {
  const user = users.find((u) => u.id === userId);
  if (!user) {
    return null;
  }

  const contact = user.contacts.find((c) => c.id === contactId);
  return contact || null;
};

type ContactDTO = {
  id?: string
  name?: string
  title?: string
  profilePicture?: { address: string }[]
  addressList?: string
  phone?: string
  email?: string
}

export const updateContact = (
  loggedUser: string,
  contactId: string,
  contactDTO: ContactDTO
) => {
  const user = users.find((u) => u.id === loggedUser);
  const contact = user?.contacts.find((c) => c.id === contactId);
  if (contact) {
    const updatedContact = {
      ...contact,
      ...contactDTO
    }
    return updatedContact;
  } else {
    return null;
  }
};
