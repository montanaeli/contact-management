type Props = {
  text: string;
  onClick?: () => void;
};

const Button = ({ text, onClick }: Props) => {
  return (
    <button
      type="button"
      className="font-light text-white bg-purple-400 py-3 px-10 rounded-full mt-6 flex items-center justify-center"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
