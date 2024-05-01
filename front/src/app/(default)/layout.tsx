import BackButton from "@/components/SimpleButton";
import UserLoaded from "@/components/UserLoaded";
import { Inter } from "next/font/google";
import { usePathname, useRouter } from 'next/navigation' 

const inter = Inter({ subsets: ["latin"] });

function goBack() {
  const router = useRouter()
  const pathname = usePathname();

  switch (pathname) {
    case '/contact/':
      router.push('/login');
      break;
    default:
      router.back();
      break;
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="flex items-center h-20 bg-purple-50 justify-between p-2">
          <BackButton text="Back" type={"back"}/>
          <UserLoaded/>
      </div>
      <div className={`${inter.className}`} >{children}</div>
    </div>
  );
}
