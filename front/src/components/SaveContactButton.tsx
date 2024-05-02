import Link from "next/link";
import Button from "@/components/Button";

type Props = {
  mode: string;
  id: string;
  onChange: () => void;
};

const SaveContactButton = ({ mode, id, onChange }: Props) => {
  return (
    <>
      {mode === "update" ? (
        <Link href={`/contact/${id}/`}>
          <Button text="Save Changes" onClick={onChange} />
        </Link>
      ) : (
        <></>
      )}
      {mode === "create" ? (
        <Link href={`/contact`}>
          <Button text="Save Changes" onClick={onChange} />
        </Link>
      ) : (
        <></>
      )}
    </>
  );
};

export default SaveContactButton;
