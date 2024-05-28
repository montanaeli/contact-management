"use client";

import ContactData from "@/components/ContactData";
import { useCallback, useEffect, useState } from "react";
import { editContactRequest, getContactById } from "@/api-client/contacts";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const Contact = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
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
        setName(response.data[0].name);
        setTitle(response.data[0].title);
        setProfilePicture(response.data[0].profilePicture);
        setAddress(response.data[0].address);
        setPhone(response.data[0].phone);
        setEmail(response.data[0].email);
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
      const response = await editContactRequest(data, headers, params.id);
      getUserData();
      Swal.fire({
        icon: "success",
        title: (await response).data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      router.push("/contact");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.response.data.details[0].message,
        confirmButtonText: "Ok",
      });
    }
  };

  return (
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
  );
};

export default Contact;
