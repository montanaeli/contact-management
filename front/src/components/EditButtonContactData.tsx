import Link from "next/link";
import Button from "@/components/Button";

type Props = {
  userContactId: string;
  mode: string;
};

const EditButtonContactData = ({ userContactId, mode }: Props) => {
  return (
    <div className="h-32 m-8 p-2 flex rounded-lg bg-gray-100 justify-end items-end">
      {mode === "view" ? (
        <Link href={`/contact/${userContactId}/edit`}>
          <Button text="EDIT" />
        </Link>
      ) : (
        <></>
      )}
    </div>
  );
};

export default EditButtonContactData;
