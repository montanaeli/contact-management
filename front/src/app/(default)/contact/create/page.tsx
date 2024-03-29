'use client'

import Image from 'next/image'
import Button from '@/components/Button'
import ContactData from '@/components/ContactData'

const Create = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <ContactData readOnly={false} mode='create' contactId={params.id}></ContactData>
    </>
  )
}

export default Create