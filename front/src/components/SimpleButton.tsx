"use client";

import { ArrowLeft } from "@phosphor-icons/react/dist/ssr/index";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  text: string;
  type: string;
};

const BackButton = ({ text, type }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  function goBack() {
    switch (pathname) {
      case '/contact/':
        router.push('/login');
        break;
      case '/contacts':
        router.push('/contact');
        break;
      default:
        router.back();
        break;
    }
  }

  return (
    <div className="flex flex-wrap items-center">
      {type === "back" ? <ArrowLeft className="opacity-50" size={18} /> : <></>}
      <button
        className="flex items-center gap-0.5 font-extralight text-extralight"
        onClick={goBack}
      >{text}</button>
    </div>
  );
};

export default BackButton;
