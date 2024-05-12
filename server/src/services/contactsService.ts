import db from "../models";
const Contactdb = db.contact;
import { Contact } from "../data/dataInterfaces";
import { v4 as uuidv4 } from "uuid";

export const getContacts = async (userId: string): Promise<Contact[]> => {
  const whereClause = { userId };
  return await Contactdb.findAll({ where: whereClause });
};

export const getContactsByName = async (
  id: string,
  name: string
): Promise<Contact[] | null> => {
  const userContacts = await getContacts(id);
  const contact = userContacts.filter((contact: any) =>
    contact.name.toLowerCase().includes(name.toLowerCase())
  );
  if (!contact) {
    return null;
  }
  return contact;
};

export const createContact = async (
  userId: string,
  name: string,
  title: string,
  profilePicture: string,
  phone: string,
  email: string
): Promise<Contact | null> => {
  if (!name || !phone || !email) {
    throw new Error("name, phone, and email are required");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format");
  }

  const newContact: Contact = {
    id: uuidv4(),
    name,
    title,
    profilePicture,
    addressList: [],
    phone,
    email,
  };

  try {
    // Crear el contacto en la base de datos
    await Contactdb.create({
      id: newContact.id,
      name: newContact.name,
      title: newContact.title,
      profilePicture: newContact.profilePicture,
      phone: newContact.phone,
      email: newContact.email,
      userId,
    });

    return newContact;
  } catch (error) {
    console.error("Error creating contact:", error);
    throw new Error("Error creating contact");
  }
};

export const getContactById = async (
  userId: string,
  contactId: string
): Promise<Contact | null> => {
  const whereClause = { userId, id: contactId };
  return await Contactdb.findAll({ where: whereClause });
};

type ContactDTO = {
  id?: string;
  name?: string;
  title?: string;
  profilePicture?: { address: string }[];
  addressList?: string;
  phone?: string;
  email?: string;
};

export const updateContact = async (
  loggedUser: string,
  contactId: string,
  contactDTO: ContactDTO
) => {
  if (!loggedUser) {
    throw new Error("User must be logged in to update contact");
  }

  if (
    !contactDTO.name &&
    !contactDTO.title &&
    !contactDTO.profilePicture &&
    !contactDTO.phone &&
    !contactDTO.email
  ) {
    throw new Error("At least one field to update must be provided");
  }

  const contactData = {
    id: contactDTO.id,
    name: contactDTO.name,
    title: contactDTO.title,
    profilePicture: contactDTO.profilePicture,
    phone: contactDTO.phone,
    email: contactDTO.email,
    userId: loggedUser,
  };
  const whereClause = { id: contactId };
  let contactUpdated = await Contactdb.sequelize.transaction(async (t: any) => {
    const contactUpdateResult = await Contactdb.update(contactData, {
      where: whereClause,
      transaction: t,
    });
    if (contactUpdateResult == 0) {
      throw Error(`Could not update contact with id: ${contactId}`);
    }

    const updatedContact = await Contactdb.findByPk(contactId, {
      transaction: t,
    });
    return updatedContact;
  });
  return contactUpdated;
};
