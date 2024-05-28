"use client";

import ContactData from "@/components/ContactData";
import { createContactRequest } from "@/api-client/contacts";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const Create = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const handleOnSubmit = async (data: any, headers: any) => {
    try {
      const response = createContactRequest(data, headers);
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
      mode="create"
      contactId={params.id}
      onSubmit={handleOnSubmit}
    ></ContactData>
  );
};

export default Create;
