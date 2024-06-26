"use client";

import SearchContact from "@/components/SearchContact";
import Button from "@/components/Button";
import ContactPreview from "@/components/ContactPreview";
import { Inter } from "next/font/google";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { getContacts, getContactByName } from "@/api-client/contacts"

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  const [searchValue, setSearchValue] = useState("");

  const [contacts, setContacts] = useState([
    {
      id: "",
      name: "",
      address: [],
      email: "",
      phone: "",
    },
  ]);

  const fetchContacts = useCallback(async () => {
    try {
        const response = await getContactByName(searchValue);
        setContacts(response);
    } catch (error) {
      console.error("Error:", error);
    }
  }, [searchValue]);

  const getContactList = useCallback(async () => {
    try {
      const response = await getContacts();
      setContacts(response);
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);

  useEffect(() => {
    if (searchValue.trim() !== "") {
      fetchContacts();
    } else {
      setContacts([]);
    }
  }, [searchValue]);

  useEffect(() => {
    getContactList();
  }, []);

  const handleAddContactButton = async () => {};

  return (
    <div>
      <div className="max-w-4xl mx-auto px-4 w-full flex flex-col gap-4 mt-40 flex justify-items-center">
        <h1 className={`${inter.className} font-bold text-3xl py-4`}>
          Contacts
        </h1>
        <SearchContact value={searchValue} onChange={setSearchValue} />
        {contacts.length === 0 ? (
          <>
            <div className="flex flex-col items-center justify-center mt-24">
              <Image
                src="/assets/users.svg"
                alt="people"
                width="200"
                height="200"
              />
              <label
                className={`${inter.className} font-bold text-2xl mt-4 mb-4 w-64 text-center`}
              >
                Add contacts to your database
              </label>
              <Link href={`/contact/create`}>
                <Button
                  text="Add new contacts"
                  onClick={handleAddContactButton}
                />
              </Link>
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-24">
            {contacts.map((contact) => (
              <ContactPreview
                key={contact.id}
                id={contact.id}
                name={contact.name}
                address={contact.address}
                email={contact.email}
                phone={contact.phone}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
