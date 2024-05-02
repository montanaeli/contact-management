type Props = {
  address?: string[];
  phone?: string;
  email?: string;
};

const ViewContactData = ({ address, phone, email }: Props) => {
  return (
    <div className="flex items-start justify-start gap-4 mt-6 md:w-80">
      <div className="flex flex-col w-1/2 gap-2 md:w-1/2">
        <h2 className="font-bold text-base font-bold mb-0.5">Address</h2>
        {address && address[0] && <p className="text-sm w-32">{address}</p>}
        <h2 className="font-bold text-base font-bold mb-0.5">Phone</h2>
        <p className="text-sm w-32">{phone}</p>
      </div>
      <div className="flex flex-col w-1/2 gap-2 md:w-1/2">
        <h2 className="font-bold text-base font-bold mb-0.5">Email</h2>
        <p className="text-sm w-32">{email}</p>
      </div>
    </div>
  );
};

export default ViewContactData;
