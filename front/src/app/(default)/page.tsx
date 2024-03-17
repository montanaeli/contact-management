'use client'

import SearchContact from '@/components/SearchContact'
import Button from '@/components/Button'
import ContactPreview from '@/components/ContactPreview'
import { Inter } from 'next/font/google'
import { useState } from 'react'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

const Home = () => {
  const [searchValue, setSearchValue] = useState('')

  const [contacts, setContacts] = useState([
    {
      name: '',
      description: '',
    },
  ])

  return (
    <div className="max-w-4xl mx-auto px-4 w-full flex flex-col gap-4 mt-40 flex justify-items-center">
      <h1 className={`${inter.className} font-bold text-3xl py-4`}>Contacts</h1>
      <SearchContact value={searchValue} onChange={() => {}} />
      {contacts.length !== 0 ? (
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
            <Button
              text="Add new contacts"
              onChange={() => console.log('clicked')}
            />
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-24">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(() => (
            <ContactPreview />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
