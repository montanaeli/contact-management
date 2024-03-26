"use client";

import ContactData from "@/components/ContactData";
import { useRouter } from "next/navigation";
import axios from "@/lib/axiosInstance";
import { useEffect, useState } from "react";
import { headers } from "next/headers";

const Contact = ({ params }: { params: { id: string } }) => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [address, setAddress] = useState<string[]>([]);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const getUserData = async () => {
    if (params.id) {
      try {
        const response = await axios.get(`/contact/${params.id}`);
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
  };

  useEffect(() => {
    getUserData();
  }, [])
  

  return (
    <>
      <ContactData
        readOnly={true}
        mode="view"
        name={name}
        title={title}
        profilePicture={profilePicture}
        address={address}
        phone={phone}
        email={email}
      ></ContactData>
    </>
  );
};

export default Contact;
