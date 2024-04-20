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
  
  export const contacts: Contact[] = [
    {
      id: "c3",
      name: "Norma Wilson",
      title: "Accounter",
      profilePicture: "",
      addressList: [
        { address: "717 S  34th St Mattoon, IL 61938" },
        { address: "718 S  34th St Mattoon, IL 61938" },
        { address: "718 S  34th St Mattoon, IL 61938" },
      ],
      phone: "(217) 499-0822",
      email: "norma@rowandtable.com",
    },
    {
      id: "c4",
      name: "Ted Steward",
      title: "Teacher",
      profilePicture: "",
      addressList: [{ address: "717 S  34th St Mattoon, IL 61938" }],
      phone: "(217) 499-0822",
      email: "ted@rowandtable.com",
    },
    {
      id: "c5",
      name: "Wade Mccoy",
      title: "Product Manager",
      profilePicture: "",
      addressList: [
        { address: "717 S  34th St Mattoon, IL 61938" },
        { address: "718 S  34th St Mattoon, IL 61938" },
        { address: "718 S  34th St Mattoon, IL 61938" },
      ],
      phone: "(217) 499-0822",
      email: "wade@rowandtable.com",
    },
  ];
  
  export const users: User[] = [
    {
      id: "1",
      username: "user1",
      password: "password1",
      contacts: contacts,
      name: "Dustin Warren",
      title: "UX Designer",
      profilePicture: "",
      addressList: [
        { address: "717 S  34th St Mattoon, IL 61938" },
        { address: "718 S  34th St Mattoon, IL 61938" },
      ],
      phone: "(217) 499-0822",
      email: "ryan@rowandtable.com",
    },
    {
      id: "2",
      username: "user2",
      password: "password2",
      contacts: [],
      name: "Kyle Lane",
      title: "UX Designer",
      profilePicture: "",
      addressList: [
        { address: "717 S  34th St Mattoon, IL 61938" },
        { address: "718 S  34th St Mattoon, IL 61938" },
      ],
      phone: "(217) 499-0822",
      email: "ryan@rowandtable.com",
    },
  ];
  