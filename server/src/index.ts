import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();

// TODO: Enable cors for a production route https://expressjs.com/en/resources/middleware/cors.html
var cors = require("cors");
app.use(cors());

const port = process.env.PORT || 3001;

app.use(bodyParser.json());

let contacts = [
  {
    id: uuidv4(),
    name: "Contact 1",
    address: "Address 1",
    email: "contact1@example.com",
    phone: "123456789",
  },
  {
    id: uuidv4(),
    name: "Contact 2",
    address: "Address 2",
    email: "contact2@example.com",
    phone: "123456789",
  },
];
let users = [
  {
    id: uuidv4(),
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
    id: uuidv4(),
    username: "user2",
    password: "password2",
    contacts: contacts,
    name: "Kyle Lane",
    title: "UX Designer",
    profilePicture: "",
    addressList: [
      { address: "717 S  34th St Mattoon, IL 61938" },
      { address: "718 S  34th St Mattoon, IL 61938" },
    ],
    phone: "(217) 499-0822",
    email: "ryan@rowandtable.com",
  }
];

const secretKey = "confidential_key";
var userId = "";

// TODO: Import middleware from another component
const verifyToken = (req: Request, res: Response, next: any) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Missing token" });
  }

  jwt.verify(token, secretKey, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ message: "Failed to authenticate token" });
    }
    userId = decoded.userId;
    next();
  });
};

app.post("/login", (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    const token = jwt.sign({ userId: user.id }, "confidential_key", {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Login successful", token });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});

app.get("/user", verifyToken, (req: Request, res: Response) => {
  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json({ message: "Your user data", user });
});

app.put("/user", verifyToken, (req: Request, res: Response) => {
  const {name, title, profilePicture, addressList, phone, email} = req.body;

  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).json({ message: "User not found"})
  }
  user.name = name;
  user.title = title;
  user.profilePicture = profilePicture;
  user.addressList = addressList;
  user.phone = phone;
  user.email = email;

  return res.status(200).json({ message: 'User updated successfully', user: users });
});

app.get("/contacts", verifyToken, (req: Request, res: Response) => {
  const user = users.find((u) => u.id === userId);
  const userContacts = user?.contacts;
  if (userContacts === undefined || !userContacts.length) {
    return res.status(401).json({ message: "No user contacts" });
  }
  return res.status(200).json(userContacts);
});

app.post("/contacts", verifyToken, (req: Request, res: Response) => {
  const { name, address, email, phone } = req.body;
  if (!name || !address || !email || !phone) {
    return res
      .status(400)
      .json({
        message: "Missing required fields: name, address, email and phone",
      });
  }
  const newContact = {
    id: uuidv4(),
    userId,
    name,
    address,
    email,
    phone,
  };
  contacts.push(newContact);
  return res
    .status(201)
    .json({ message: "Contact created", contact: newContact });
});

app.get("/contacts/contact", verifyToken, (req: Request, res: Response) => {
  let contactName: string = req.query.contactName as string;
  if (!contactName) {
    return res.status(400).json({ message: "Missing contactName parameter" });
  }

  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(500).json({ message: "User not found" });
  }

  const userContacts = user.contacts;
  if (!Array.isArray(userContacts)) {
    return res.status(500).json({ message: "User contacts not found" });
  }

  const filteredContacts = userContacts.filter((contact) =>
    contact.name.toLowerCase().includes(contactName.toLowerCase())
  );

  if (filteredContacts.length === 0) {
    return res.status(404).json({ message: "No contacts found" });
  }

  return res.status(200).json(filteredContacts);
});

app.post("/contacts/", verifyToken, (req: Request, res: Response) => {
  const contactId = uuidv4();
  const { name, address, email, phone } = req.body;

  if (!name || !address || !email || !phone) {
    return res
      .status(400)
      .json({
        message: "Missing required fields: name, address, email and phone",
      });
  }

  const createContact = {
    id: contactId,
    name,
    address,
    email,
    phone,
  };

  return res
    .status(200)
    .json({ message: "Contact modified successfully", contact: createContact });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
