'use client'

import ContactData from '@/components/ContactData'
import { createContactRequest } from '@/api-client/contacts'

const Create = ({ params }: { params: { id: string } }) => {

  const handleOnSubmit = async (data: any, headers: any) => {
    try {
      createContactRequest(data, headers)
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