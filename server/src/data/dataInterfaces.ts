export interface Contact {
    id: string;
    name: string;
    title: string;
    profilePicture: string;
    addressList: { address: string }[];
    phone: string;
    email: string;
  }
  
  export interface User {
    id: string;
    username: string;
    password: string;
    contacts: Contact[];
    name: string;
    title: string;
    profilePicture: string;
    addressList: { address: string }[];
    phone: string;
    email: string;
  }
  