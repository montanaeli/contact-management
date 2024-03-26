'use client'

import Image from 'next/image'
import Button from '@/components/Button'
import ContactData from '@/components/ContactData'

const Create = () => {
  return (
    <>
      <ContactData readOnly={false} mode='create'></ContactData>
    </>
  )
}

export default Create