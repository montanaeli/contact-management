"use client";

import ContactData from "@/components/ContactData";
import { useCallback, useEffect, useState } from "react";
import { editContactRequest, getContactById } from "@/api-client/contacts";

const Contact = ({ params }: { params: { id: string } }) => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [address, setAddress] = useState<string[]>([]);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const getUserData = useCallback(async () => {
    if (params.id) {
      try {
        const response = await getContactById(params.id);
        setName(response.data.name);
        setTitle(response.data.title);
        setProfilePicture(response.data.profilePicture);
        setAddress(response.data.address);
        setPhone(response.data.phone);
        setEmail(response.data.email);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  }, []);

  useEffect(() => {
    getUserData();
  }, []);

  const handleOnSubmit = async (data: any, headers: any) => {
    try {
      await editContactRequest(data, headers, params.id);
      getUserData()
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <>
      <ContactData
        readOnly={false}
        mode="update"
        name={name}
        title={title}
        profilePicture={profilePicture}
        address={address}
        phone={phone}
        email={email}
        contactId={params.id}
        onSubmit={handleOnSubmit}
      ></ContactData>
    </>
  );
};

export default Contact;
