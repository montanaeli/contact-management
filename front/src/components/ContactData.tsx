import Image from "next/image";

import { SubmitData, Props, Headers } from "@/lib/types";
import EditButtonContactData from "./EditButtonContactData";
import ViewContactData from "./ViewContactData";
import EditContactData from "./EditContactData";

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
  onSubmit,
}: Props) => {

  return (
    <>
      <EditButtonContactData userContactId={contactId} mode={mode} />
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
            <ViewContactData address={address} phone={phone} email={email} />
          ) : (
            <EditContactData
              contactId={contactId}
              mode={mode}
              name={name}
              title={title}
              profilePicture={profilePicture}
              address={address}
              phone={phone}
              email={email}
              onSubmit={onSubmit}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ContactData;
