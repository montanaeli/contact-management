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
    // id: uuidv4(),
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
    // id: uuidv4(),
    id: "c4",
    name: "Ted Steward",
    title: "Teacher",
    profilePicture: "",
    addressList: [{ address: "717 S  34th St Mattoon, IL 61938" }],
    phone: "(217) 499-0822",
    email: "ted@rowandtable.com",
  },
  {
    // id: uuidv4(),
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
let users = [
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

const secretKey = "confidential_key";

// TODO: Import middleware from another component
const verifyToken = (req: Request, res: Response, next: any) => {
  const authToken = req.headers.authorization;
  if (!authToken) {
    return res.status(401).json({ message: "Missing token" });
  }

  const token = authToken.toString().replace("Bearer ", "");

  jwt.verify(token, secretKey, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ message: "Failed to authenticate token" });
    }
    req.currentUser = decoded.userId;
    next();
  });
};

app.get("/me", verifyToken, (req: Request, res: Response) => {
  const actualUser = users.find((u) => u.id === req.currentUser);
  res.status(200).json({
    id: actualUser?.id,
    name: actualUser?.name,
    contacts: actualUser?.contacts,
  });
});

app.post("/login", (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    const token = jwt.sign({ userId: user.id }, "confidential_key", {
      expiresIn: "3h",
    });
    res.status(200).json({ message: "Login successful", token });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});

app.get("/contact/:id", verifyToken, (req: Request, res: Response) => {
  const user = users.find((u) => u.id === req.currentUser);
  const id = req.params.id;

  if (!id) {
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  } else {
    const contact = user?.contacts.find((c) => c.id === id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    return res.status(200).json(contact);
  }
});

app.put("/contact/:id", verifyToken, (req: Request, res: Response) => {
  const { name, title, profilePicture, addressList, phone, email } = req.body;
  const id = req.params.id;

  const user = users.find((u) => u.id === req.currentUser);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  } else {
    const contact = user?.contacts.find((c) => c.id === id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    contact.name = name;
    contact.title = title;
    contact.profilePicture = profilePicture;
    contact.addressList = addressList;
    contact.phone = phone;
    contact.email = email;

    return res
      .status(200)
      .json({ message: "User updated successfully", contact });
  }
});

app.get("/contacts", verifyToken, (req: Request, res: Response) => {
  const name = req.query.search?.toString();
  const user = users.find((u) => u.id === req.currentUser);
  // if (Object.keys(req.query).length === 0) {
  const userContacts = user?.contacts.filter((contact) =>
    contact.name.toLowerCase().includes(name!.toLowerCase())
  );
  if (!userContacts) {
    return res.status(404).json({ message: "Contact not found" });
  }
  return res.status(200).json(userContacts);
  // }
});

app.post("/contact", verifyToken, (req: Request, res: Response) => {
  const { name, title, profilePicture, addressList, phone, email } = req.body;
  if (!name || !title || !profilePicture || !addressList || !email || !phone) {
    return res.status(400).json({
      message: "Missing required fields: name, title, profile picture address, email and phone",
    });
  }
  const newContact = {
    id: uuidv4(),
    name,
    title,
    profilePicture,
    addressList,
    phone,
    email,
  };
  contacts.push(newContact);
  return res
    .status(201)
    .json({ message: "Contact created", contact: newContact });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
