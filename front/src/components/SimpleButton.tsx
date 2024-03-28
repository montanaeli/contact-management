"use client";

import { ArrowLeft } from "@phosphor-icons/react/dist/ssr/index";

type Props = {
  text: string;
  type: string;
};

const SimpleButton = ({ text, type }: Props) => {
  const goBack = () => {
    window.history.back();
  };
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

export default SimpleButton;
