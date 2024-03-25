"use client";

import { Provider } from "react-redux";
import { makeStore } from "@/lib/store";
import React from "react";

const store = makeStore()

type Props = {
  children: React.ReactNode
}

export default function Providers({ children }: Props) {
  return <Provider store={store}>{children}</Provider>;
}