type Props = {
    title: string
    placeholder: string
    value: string;
    type: "text" | "password"
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ title, placeholder, value, type, onChange }: Props) => {
    return (
        <div className="w-full">
            <label>
                {title}
            </label>
            <input
                type={type}
                className="text-neutral-800 p-2 bg-purple-200 rounded-md w-full font-thin"
                value={value}
                placeholder={placeholder}
                onChange={onChange}
            />
        </div>
    )
}

export default Input;
