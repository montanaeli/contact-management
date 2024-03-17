import { MagnifyingGlass } from "@phosphor-icons/react";

type Props = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchContact = ({value, onChange}: Props) => {
    return (
        <div  className="relative text-gray-400 focus-within:text-gray-600 inline-flex w-full">
            <MagnifyingGlass size={32}/>
            <input className="shadow-xl text-neutral-800 p-2 bg-white rounded-md font-thin w-full"/>
        </div>

    )
}

export default SearchContact