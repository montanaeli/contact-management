import SimpleButton from "@/components/SimpleButton";
import UserLoaded from "@/components/UserLoaded";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="flex items-center h-20 bg-purple-50 justify-between p-2">
          <SimpleButton text="Back" type={"back"} />
          <UserLoaded/>
      </div>
      <div className={`${inter.className}`} >{children}</div>
    </div>
  );
}
