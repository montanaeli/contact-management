export type SubmitData = {
  name?: string;
  title?: string;
  address?: string[];
  profilePicture?: string;
  phone?: string;
  email?: string;
};

export type Headers = {
  [key: string]: string;
};

export type Props = {
  readOnly: boolean;
  mode: "create" | "update" | "view";
  name?: string;
  title?: string;
  profilePicture?: string;
  address?: string[];
  phone?: string;
  email?: string;
  contactId: string;
  onSubmit?: (data: SubmitData, headers: Headers) => void;
};
