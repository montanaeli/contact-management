import Input from "./Input";
import Select from "react-select";
import { useEffect, useState } from "react";
import SaveContactButton from "./SaveContactButton";
import useAuthToken from "@/hooks/useAuthToken";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

type Props = {
  contactId: string;
  mode: string;
  name?: string;
  title?: string;
  profilePicture?: string;
  address?: string[];
  phone?: string;
  email?: string;
  onSubmit?: (data: any, headers: any) => void;
};

const EditContactData = ({
  contactId,
  mode,
  name,
  title,
  profilePicture,
  address,
  phone,
  email,
  onSubmit,
}: Props) => {
  const [userName, setUserName] = useState(name);
  const [userTitle, setUserTitle] = useState(title);
  const [userProfilePicture, setUserProfilePicture] = useState(profilePicture);
  const [userAddress, setUserAddress] = useState(address);
  const [userPhone, setUserPhone] = useState(phone);
  const [userEmail, setUserEmail] = useState(email);
  const token = useAuthToken();

  const router = useRouter();

  useEffect(() => {
    setUserName(name);
    setUserTitle(title);
    setUserProfilePicture(profilePicture);
    setUserAddress(address);
    setUserPhone(phone);
    setUserEmail(email);
  }, [name, title, profilePicture, address, phone, email]);

  const validate = (updateUser: any): boolean => {
    let isValid = true;
    if (!updateUser.name || !updateUser.email) {
      isValid = false;
      Swal.fire({
        title: "Error!",
        text: `Don't leave empty fields`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
    return isValid;
  };

  const handleSaveChanges = () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    if (onSubmit) {
      const updateUser = {
        name: userName,
        title: userTitle,
        profilePicture: userProfilePicture,
        address: [""],
        phone: userPhone,
        email: userEmail,
      };
      if (validate(updateUser)) {
        console.log("update user ", updateUser);
        onSubmit(updateUser, headers);
      }
      router.push("/contact");
    }
  };

  return (
    <>
      <div className="flex items-start justify-start gap-4 mt-6 md:w-200">
        <div className="flex flex-col w-1/2 gap-2">
          <Input
            title="Name"
            placeholder="Name"
            value={userName || ""}
            type="text"
            onChange={(e) => setUserName(e.target.value)}
          />
          <Input
            title="Title"
            placeholder="Title"
            value={userTitle || ""}
            type="text"
            onChange={(e) => setUserTitle(e.target.value)}
          />
          <Input
            title="Profile Picture"
            placeholder="Profile Picture"
            value={userProfilePicture || ""}
            type="text"
            onChange={(e) => setUserProfilePicture(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-1/2 gap-2 md:w-1/2">
          <label>Addresses</label>
          <Select options={userAddress || []} />
          <Input
            title="Phone"
            placeholder="Phone"
            value={userPhone || ""}
            type="text"
            onChange={(e) => setUserPhone(e.target.value)}
          />
          <Input
            title="Email"
            placeholder="Email"
            value={userEmail || ""}
            type="text"
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>
      </div>
      <SaveContactButton
        mode={mode}
        id={contactId}
        onChange={handleSaveChanges}
      />
    </>
  );
};

export default EditContactData;
