import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

let users = [
  { id: "1", username: "user1", password: "password1" },
  { id: "2", username: "user2", password: "password2" },
];

let contacts = [
  {
    id: "1",
    userId: "1",
    name: "Contact 1",
    address: "Address 1",
    email: "contact1@example.com",
    phone: "123456789",
  },
];

const secretKey = 'confidential_key';
var userId = "";

const verifyToken = (req: Request, res: Response, next: any) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Missing token' });
  }

  jwt.verify(token, secretKey, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ message: 'Failed to authenticate token' });
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
    const token = jwt.sign({ userId: user.id }, 'confidential_key', { expiresIn: '1h' });
    res.status(200).json({ message: "Login successful", token });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});

app.get('/user', verifyToken, ((req: Request, res: Response) => {
  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ message: 'Not found' });
  }
  return res.status(200).json({ message: "Your user data", user});
}));

app.get("/contacts", verifyToken, (req: Request, res: Response) => {
  const userContacts = contacts.filter((contact) => contact.userId === userId);
  if (userContacts.length === 0) {
    return res.status(401).json({ message: "No user contacts" });
  }
  return res.status(200).json(userContacts);
});


app.post("/contacts", verifyToken, (req: Request, res: Response) => {
  const { name, address, email, phone } = req.body;
  if (!name || !address || !email || !phone) {
    return res.status(400).json({ message: "Missing required fields: name, address, email and phone" });
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
  return res.status(201).json({ message: "Contact created", contact: newContact });
});


app.put("/contacts/:contactId", verifyToken, (req: Request, res: Response) => {
  const contactId = req.params.contactId;
  const { name, address, email, phone } = req.body;

  if (!name || !address || !email || !phone) {
    return res.status(400).json({ message: "Missing required fields: name, address, email and phone" });
  }
  const existingContactIndex = contacts.findIndex((contact) => contact.id === contactId);
  if (existingContactIndex === -1) {
    return res.status(404).json({ message: "Contact not found" });
  }
  const updatedContact = {
    id: contactId,
    userId: userId,
    name,
    address,
    email,
    phone,
  };
  contacts[existingContactIndex] = updatedContact;
  return res.status(200).json({ message: "Contact modified successfully", contact: updatedContact });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
