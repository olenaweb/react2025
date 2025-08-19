"use client";

import { Provider } from "react-redux";
import { makeStore } from "@/store/store";
const store = makeStore();

export function AppProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
