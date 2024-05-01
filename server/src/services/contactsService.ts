import { Contact } from "../data/dataInterfaces";
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from "uuid";

const dataDirectory = path.join(__dirname, '..', 'data');
const usersDataPath = path.join(dataDirectory, 'users.json');

function findUser(userId: string) {
  const usersJson = fs.readFileSync(usersDataPath, 'utf8');
  let users = JSON.parse(usersJson);
  const user = users.find((u : any) => u.id === userId);
  if (!user) {
    return null;
  }
  return user;
}

export const getContacts = (userId: string): Contact[] => {
  const user = findUser(userId)
  return user?.contacts || [];
};

export const getContactsByName = (
  id: string,
  name: string
): Contact[] | null => {
  const user = findUser(id)
  const contact = user.contacts.filter((contact: any) =>
    contact.name.toLowerCase().includes(name.toLowerCase())
  );
  if(!contact) {
    return null
  }
  return contact
};

export const createContact = (
  userId: string,
  name: string,
  title: string,
  profilePicture: string,
  phone: string,
  email: string
): Contact | null => {
  const newContact: Contact = {
    id: uuidv4(),
    name,
    title,
    profilePicture,
    addressList: [],
    phone,
    email
  };
  const usersJson = fs.readFileSync(usersDataPath, 'utf8');
  let users = JSON.parse(usersJson);

  const user = findUser(userId)
  user.contacts.push(newContact);

  fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
  return newContact;
};

export const getContactById = (
  userId: string,
  contactId: string
): Contact | null => {
  const user = findUser(userId)
  const contact = user.contacts.find((c : any) => c.id === contactId);
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
  const usersJson = fs.readFileSync(usersDataPath, 'utf8');
  let users = JSON.parse(usersJson);

  const userIndex = users.findIndex((u: any) => u.id === loggedUser);
  if (userIndex === -1) {
    return null;
  }
  const contactIndex = users[userIndex].contacts.findIndex((contact: any) => contact.id === contactId);
  if (contactIndex === -1) {
    return null;
  }

  users[userIndex].contacts[contactIndex] = { ...users[userIndex].contacts[contactIndex], ...contactDTO };
  fs.writeFileSync(usersDataPath, JSON.stringify(users, null, 2));

  return users[userIndex].contacts[contactIndex];

};
