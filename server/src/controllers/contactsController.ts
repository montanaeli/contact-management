import express from "express";
import { Request, Response } from "express";
import {
  getContacts,
  createContact,
  getContactById,
  updateContact,
  getContactsByName,
} from "../services/contactsService";
import _ from "lodash";

const router = express.Router();

export const getContactsController = async (req: Request, res: Response) => {
  const name = req.query.search?.toString();
  if (!name) {
    const userContacts = await getContacts(req.currentUser);
    if (userContacts) {
      res.status(200).json(userContacts);
    } else {
      return res.status(401).json({ message: "No user contacts" });
    }
  } else {
    const userContactsByName = await getContactsByName(req.currentUser, name);
    if (userContactsByName) {
      res.status(200).json(userContactsByName);
    } else {
      return res.status(401).json({ message: "Contact not found" });
    }
  }
};

export const createContactController = async (req: Request, res: Response) => {
  const { name, title, profilePicture, phone, email } = req.body;
  const newContact = await createContact(
    req.currentUser,
    name,
    title,
    profilePicture,
    phone,
    email
  );
  if (!newContact) {
    return res
      .status(401)
      .json({ message: "An error occurred while creating the contact" });
  }
  res.status(201).json({ message: "Contact created", contact: newContact });
};

export const getContactByIdController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const contact = await getContactById(req.currentUser, id);
  if (!contact) {
    return res.status(404).json({ message: "Contact not found" });
  }
  res.status(200).json(contact);
};

export const updateContactController = async (req: Request, res: Response) => {
  const contactId = req.params.id;
  const updateData = _.pick(req.body, [
    "name",
    "title",
    "profilePicture",
    "addressList",
    "phone",
    "email",
  ]);
  const updatedContact = await updateContact(
    req.currentUser,
    contactId,
    updateData
  );
  if (!updatedContact) {
    return res.status(404).json({ message: "Contact not found" });
  }
  res
    .status(200)
    .json({ message: "Contact updated successfully", contact: updatedContact });
};
