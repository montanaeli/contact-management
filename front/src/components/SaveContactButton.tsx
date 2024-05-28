import Button from "@/components/Button";

type Props = {
  mode: string;
  id: string;
  onChange: () => void;
};

const SaveContactButton = ({ mode, id, onChange }: Props) => {
  return <Button text="Save Changes" onClick={onChange} />;
};

export default SaveContactButton;
