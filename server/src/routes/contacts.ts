// import express from "express";
// import { v4 as uuidv4 } from "uuid";
// import { users } from "../data";

// const router = express.Router();

// router.get("/", (req, res) => {
//   const user = users.find((u) => u.id === req.currentUser);
//   const userContacts = user?.contacts;
//   if (!userContacts) {
//     return res.status(404).json({ message: "Contact not found" });
//   }
//   return res.status(200).json(userContacts);
// });

// router.post("/", (req, res) => {
//   const { name, title, profilePicture, phone, email } = req.body;
//   if (!name || !title || !profilePicture || !email || !phone) {
//     return res.status(400).json({
//       message:
//         "Missing required fields: name, title, profile picture address, email and phone",
//     });
//   }
//   const addressList: { address: string }[] = [
//     { address: "Dirección 1" },
//     { address: "Dirección 2" },
//   ];
//   const newContact = {
//     id: uuidv4(),
//     name,
//     title,
//     profilePicture,
//     addressList,
//     phone,
//     email,
//   };
//   const user = users.find((u) => u.id === req.currentUser);
//   user?.contacts.push(newContact);
//   return res
//     .status(201)
//     .json({ message: "Contact created", contact: newContact });
// });

// router.get("/:id", (req, res) => {
//   const user = users.find((u) => u.id === req.currentUser);
//   const id = req.params.id;

//   if (!id) {
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//   } else {
//     const contact = user?.contacts.find((c) => c.id === id);
//     if (!contact) {
//       return res.status(404).json({ message: "Contact not found" });
//     }

//     return res.status(200).json(contact);
//   }
// });

// router.put("/:id", (req, res) => {
//   const { name, title, profilePicture, addressList, phone, email } = req.body;
//   const id = req.params.id;

//   const user = users.find((u) => u.id === req.currentUser);
//   if (!user) {
//     return res.status(404).json({ message: "User not found" });
//   } else {
//     const contact = user?.contacts.find((c) => c.id === id);
//     if (!contact) {
//       return res.status(404).json({ message: "Contact not found" });
//     }
//     contact.name = name;
//     contact.title = title;
//     contact.profilePicture = profilePicture;
//     contact.addressList = addressList;
//     contact.phone = phone;
//     contact.email = email;

//     return res
//       .status(200)
//       .json({ message: "User updated successfully", contact });
//   }
// });

// export { router as contactsRoutes };
