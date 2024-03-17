import Image from 'next/image'
import Button from '@/components/Button'
import Input from './Input'
import { useState } from 'react'

type Props = {
  readOnly: boolean
  mode: 'create' | 'update'
}

const ContactData = ({ readOnly, mode }: Props) => {
  const [name, setName] = useState('')
  const [title, setTitle] = useState('')
  const [profilePicture, setProfilePicture] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  return (
    <>
      <div className="h-32 m-8 p-2 flex rounded-lg bg-gray-100 justify-end items-end">
        <Button text="EDIT" onChange={() => console.log('clicked')} />
      </div>
      <div className="relative">
        <div className="flex flex-col justify-center items-center gap-2 absolute left-0 right-0 -top-20">
          <Image
            src="/assets/profile-picture.svg"
            alt="profile-picture"
            width={150}
            height={150}
          />
          <label className="font-bold text-lg mt-3">Dustin Warren</label>
          <label className="font-extralight text-sm">UX Designer</label>
          { readOnly ? (
            <div className="flex items-start justify-start gap-4 mt-6 md:w-80">
              <div className="flex flex-col w-1/2 gap-2 md:w-1/2">
                <h2 className="font-bold text-base font-bold mb-0.5">
                  Address
                </h2>
                <p className="text-sm w-32">717 S 34th St Mattoon, IL 61938</p>
                <h2 className="font-bold text-base font-bold mb-0.5">Phone</h2>
                <p className="text-sm w-32">(217) 499-0822</p>
              </div>
              <div className="flex flex-col w-1/2 gap-2 md:w-1/2">
                <h2 className="font-bold text-base font-bold mb-0.5">Email</h2>
                <p className="text-sm w-32">ryan@rowandtable.com</p>
              </div>
            </div>
          ) : (
            <div className="flex items-start justify-start gap-4 mt-6 md:w-200">
              <div className="flex flex-col w-1/2 gap-2">
                <Input
                  title="Name"
                  placeholder=""
                  value={name}
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  title="Title"
                  placeholder=""
                  value={title}
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Input
                  title="Profile Picture"
                  placeholder=""
                  value={profilePicture}
                  type="text"
                  onChange={(e) => setProfilePicture(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-1/2 gap-2 md:w-1/2">
                <Input
                  title="Address"
                  placeholder=""
                  value={address}
                  type="text"
                  onChange={(e) => setAddress(e.target.value)}
                />
                <Input
                  title="Phone"
                  placeholder=""
                  value={address}
                  type="text"
                  onChange={(e) => setPhone(e.target.value)}
                />
                <Input
                  title="Email"
                  placeholder=""
                  value={address}
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ContactData
