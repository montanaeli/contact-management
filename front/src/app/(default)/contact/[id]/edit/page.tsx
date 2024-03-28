'use client'

import Image from 'next/image'
import Button from '@/components/Button'
import ContactData from '@/components/ContactData'

const Contact = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <ContactData readOnly={false} mode='update' contactId={params.id}></ContactData>
    </>
  )
}

export default Contact