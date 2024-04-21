import express from "express";
import { Request, Response } from "express";
import { getContacts, createContact, getContactById, updateContact, getContactsByName } from "../services/contactsService";
import _ from "lodash";

const router = express.Router();

export const getContactsController = (req: Request, res: Response) => {
    const name = req.query.search?.toString()
    if (!name) {
        const userContacts = getContacts(req.currentUser);
        if (userContacts) {
            res.status(200).json(userContacts);
        } else {
            return res.status(401).json({ message: "No user contacts" })
        }
    } else {
        const userContactsByName = getContactsByName(req.currentUser, name);
        if (userContactsByName) {
            res.status(200).json(userContactsByName);
        } else {
            return res.status(401).json({ message: "Contact not found" })
        }
    }
}

export const createContactController = (req: Request, res: Response) => {
  const { name, title, profilePicture, phone, email } = req.body;
  const newContact = createContact(req.currentUser, name, title, profilePicture, phone, email);
  res.status(201).json({ message: "Contact created", contact: newContact });
};

export const getContactByIdController = (req: Request, res: Response) => {
  const id = req.params.id;
  const contact = getContactById(req.currentUser, id);
  if (!contact) {
    return res.status(404).json({ message: "Contact not found" });
  }
  res.status(200).json(contact);
};

export const updateContactController = (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, title, profilePicture, addressList, phone, email } = req.body;
  const updateData = _.pick(req.body, ["name", "title", "profilePicture", "addressList", "phone", "email"])
  const updatedContact = updateContact(req.currentUser, updateData);
  if (!updatedContact) {
    return res.status(404).json({ message: "Contact not found" });
  }
  res.status(200).json({ message: "Contact updated successfully", contact: updatedContact });
};
