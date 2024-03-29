import Image from "next/image";
import Button from "@/components/Button";
import Input from "./Input";
import { useEffect, useState } from "react";
import Select from "react-select";
import Link from "next/link";
import axios from "@/lib/axiosInstance";

type SubmitData = {
  name?: string;
  title?: string;
  address?: string[];
  phone?: string;
  email?: string;
}

type Headers = {
  [key: string]: string;
}

type Props = {
  readOnly: boolean;
  mode: "create" | "update" | "view";
  name?: string;
  title?: string;
  profilePicture?: string;
  address?: string[];
  phone?: string;
  email?: string;
  contactId: string;
  onSubmit?: (data: SubmitData, headers: Headers) => void
};

const ContactData = ({
  readOnly,
  mode,
  name,
  title,
  profilePicture,
  address,
  phone,
  email,
  contactId,
  onSubmit
}: Props) => {
  const [userName, setUserName] = useState(name);
  const [userTitle, setUserTitle] = useState(title);
  const [userProfilePicture, setUserProfilePicture] = useState(profilePicture);
  const [userAddress, setUserAddress] = useState(address);
  const [userPhone, setUserPhone] = useState(phone);
  const [userEmail, setUserEmail] = useState(email);

  useEffect(() => {
    setUserName(name)
    setUserTitle(title)
    setUserProfilePicture(profilePicture)
    setUserAddress(address)
    setUserPhone(phone)
    setUserEmail(email)
  }, [name, title, profilePicture, address, phone, email])

  const handleSaveChanges = () => {
    const token = localStorage.getItem("authToken");
    const headers = {
        'Authorization' : `Bearer ${token}`
    }
    const updateUser = {
      name: userName,
      title: userTitle,
      address: userAddress,
      phone: userPhone,
      email: userEmail
    }
    if(onSubmit){
      onSubmit(updateUser, headers)
    }
  }

  return (
    <>
      <div className="h-32 m-8 p-2 flex rounded-lg bg-gray-100 justify-end items-end">
        {mode === "view" ? (
          <Link href={`/contact/${contactId}/edit`}>
            <Button text="EDIT" />
          </Link>
          ) : (
          <></>
        )}
      </div>
      <div className="relative">
      <Image
      className="absolute bottom-full left-1/2 -translate-x-[50%]"
            src="/assets/profile-picture.svg"
            alt="profile-picture"
            width={150}
            height={150}
          />
        <div className="flex flex-col justify-center items-center gap-2 margin-top: 80px">
          <label className="font-bold text-lg mt-3">{name}</label>
          <label className="font-extralight text-sm">{title}</label>
          {readOnly ? (
            <div className="flex items-start justify-start gap-4 mt-6 md:w-80">
              <div className="flex flex-col w-1/2 gap-2 md:w-1/2">
                <h2 className="font-bold text-base font-bold mb-0.5">
                  Address
                </h2>
                {address && address[0] && (
                  <p className="text-sm w-32">{address}</p>
                )}
                <h2 className="font-bold text-base font-bold mb-0.5">Phone</h2>
                <p className="text-sm w-32">{phone}</p>
              </div>
              <div className="flex flex-col w-1/2 gap-2 md:w-1/2">
                <h2 className="font-bold text-base font-bold mb-0.5">Email</h2>
                <p className="text-sm w-32">{email}</p>
              </div>
            </div>
          ) : (
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
          )}
           {mode === "update" ? (
            <Link href={`/contact/${contactId}/`}>
              <Button text="Save Changes" onClick={handleSaveChanges} />
          </Link>
        ) : (
          <></>
        )}
        </div>
      </div>
    </>
  );
};

export default ContactData;
function uuidv4() {
  throw new Error("Function not implemented.");
}

