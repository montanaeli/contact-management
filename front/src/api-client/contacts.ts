import axios from "@/lib/axiosInstance";

export async function createContactRequest(data: any, headers: any) {
  const response = await axios.post(`contacts/`, data, headers);
  if (response) {
    console.log("User created successfully");
  } else {
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
