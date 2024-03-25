import Image from "next/image"
import { CaretRight } from "@phosphor-icons/react"

type Props = {
    id: string
    name: string
    address: string []
    email: string
    phone: string
}

const ContactPreview = ({ id, name, address, email, phone} : Props) => {
    return (
        <a className="flex items-center m-1 shadow-md" href={`/contact/${id}`}>
            <Image src="/assets/avatar.svg" alt="avatar" width={80} height={80}/>
            <div className="flex flex-col text-left justify-center ml-4 mr-4">
                <label className="font-bold text-base">{name}</label>
                <label className="text-sm">{email}</label>
            </div>
            <CaretRight size={32} className="flex flex-col justify-center" />
        </a>
    )
}

export default ContactPreview