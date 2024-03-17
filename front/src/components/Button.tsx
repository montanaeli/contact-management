type Props = {
    text: string;
    onChange: (e: React.ChangeEvent<HTMLButtonElement>) => void;
}

const Button = ({ text, onChange }: Props) => {
    return (
        <button type="button" className="font-light text-white bg-purple-400 py-3 px-10 rounded-full mt-6 flex items-center justify-center" onChange={onChange}>
            {text}
        </button>
    );

}

export default Button;