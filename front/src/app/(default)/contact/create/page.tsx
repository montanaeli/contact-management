'use client'

import Image from 'next/image'
import Button from '@/components/Button'
import ContactData from '@/components/ContactData'
import axios from '@/lib/axiosInstance'

const Create = ({ params }: { params: { id: string } }) => {

  const handleOnSubmit = async (data: any, headers: any) => {
    try {
      const response = await axios.post(`contact/`, data, headers)
      if (response) {
        console.log("User created successfully")
      } 
    } catch (error) {
      console.log("Error creating user: ", error)
    }
  }
  
  return (
    <>
      <ContactData readOnly={false} mode='create' contactId={params.id} onSubmit={handleOnSubmit}></ContactData>
    </>
  )
}

export default Create