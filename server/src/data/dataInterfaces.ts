export interface Contact {
  id: string;
  name: string;
  title: string;
  profilePicture: string;
  address: string[];
  phone: string;
  email: string;
  userId: string;
}

export interface User {
  id: string;
  username: string;
  password: string;
  contacts: Contact[];
  name: string;
  title: string;
  profilePicture: string;
  address: string[];
  phone: string;
  email: string;
}
