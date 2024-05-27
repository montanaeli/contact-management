"use client";

import ContactData from "@/components/ContactData";
import { createContactRequest } from "@/api-client/contacts";
import Swal from "sweetalert2";

const Create = ({ params }: { params: { id: string } }) => {
  const handleOnSubmit = async (data: any, headers: any) => {
    try {
      const response = createContactRequest(data, headers);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: (await response).data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log("Error creating user: ", error);
    }
  };

  return (
    <>
      <ContactData
        readOnly={false}
        mode="create"
        contactId={params.id}
        onSubmit={handleOnSubmit}
      ></ContactData>
    </>
  );
};

export default Create;
