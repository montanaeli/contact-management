import Image from "next/image";
import Button from "@/components/Button";
import Input from "./Input";
import { useState } from "react";
import Select from "react-select";
import Link from "next/link";

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
}: Props) => {
  const [userName, setUserName] = useState("");
  const [userTitle, setUserTitle] = useState("");
  const [userProfilePicture, setUserProfilePicture] = useState("");
  const [userAddress, setUserAddress] = useState<string[]>([]);
  const [userPhone, setUserPhone] = useState("");
  const [userEmail, setUserEmail] = useState("");

  return (
    <>
      <div className="h-32 m-8 p-2 flex rounded-lg bg-gray-100 justify-end items-end">
        {mode === "view" ? (
          <></>
        ) : (
          <Link href={`/contact/${contactId}/edit`}>
            <Button text="EDIT" />
          </Link>
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
                  placeholder=""
                  value={userName}
                  type="text"
                  onChange={(e) => setUserName(e.target.value)}
                />
                <Input
                  title="Title"
                  placeholder=""
                  value={userTitle}
                  type="text"
                  onChange={(e) => setUserTitle(e.target.value)}
                />
                <Input
                  title="Profile Picture"
                  placeholder=""
                  value={userProfilePicture}
                  type="text"
                  onChange={(e) => setUserProfilePicture(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-1/2 gap-2 md:w-1/2">
                <Select options={userAddress} />
                <Input
                  title="Phone"
                  placeholder=""
                  value={userPhone}
                  type="text"
                  onChange={(e) => setUserPhone(e.target.value)}
                />
                <Input
                  title="Email"
                  placeholder=""
                  value={userEmail}
                  type="text"
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ContactData;
