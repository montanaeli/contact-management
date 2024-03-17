'use client'

import Image from 'next/image'
import Button from '@/components/Button'
import ContactData from '@/components/ContactData'

const Contact = () => {
  return (
    <>
      <ContactData readOnly={true} mode='create'></ContactData>
    </>
  )
}

export default Contact
