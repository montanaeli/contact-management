import Image from "next/image"
import { CaretRight } from "@phosphor-icons/react"

const ContactPreview = () => {
    return (
        <div className="flex items-center m-1 shadow-md">
            <Image src="/assets/avatar.svg" alt="avatar" width={80} height={80}/>
            <div className="flex flex-col text-left justify-center ml-4 mr-4">
                <label className="font-bold text-base">Alex Marchal</label>
                <label className="text-sm">I have some questions about...</label>
            </div>
            <CaretRight size={32} className="flex flex-col justify-center" />
        </div>
    )
}

export default ContactPreview