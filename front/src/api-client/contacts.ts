import axios from "@/lib/axiosInstance";
import { toast } from "react-toastify";

export async function createContactRequest(data: any, headers: any) {
  const response = await axios.post(`contacts/`, data, headers);
  if (response) {
    // console.log("User created successfully");
    toast.success("User created successfully");
  } else {
    toast.error("There was an error creating the contact.");
    throw new Error("There was an error creating the contact.");
  }
}

export async function editContactRequest(data: any, headers: any, id: string) {
  const response = await axios.put(`contacts/${id}`, data, headers);
  if (response) {
    console.log("User updated successfully", response);
  } else {
    throw new Error("There was an error updating the contact.");
  }
}

export async function getContactById(id: string) {
  const response = await axios.get(`/contacts/${id}`);
  if (response) {
    return response;
  } else {
    throw new Error("There was an error reading the contact by the id.");
  }
}

export async function getContacts() {
  const response = await axios.get("/contacts");
  if (response) {
    return response.data;
  } else {
    throw new Error("There was an error returning contacts");
  }
}

export async function getContactByName(name: string) {
  const response = await axios.get(`/contacts?search=${name}`);

  if (response) {
    return response.data;
  } else {
    console.error("Failed to fetch contacts");
  }
}
