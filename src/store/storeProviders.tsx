"use client";

import { Provider } from "react-redux";
import { ReactNode } from "react";
import { makeStore } from "./store";
import { RootState } from "./store";

export default function StoreProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: RootState;
}) {
  const store = makeStore();

  if (initialState) {
    store.dispatch({ type: "__NEXT_REDUX_REHYDRATE__", payload: initialState });
  }

  return <Provider store={store}>{children}</Provider>;
}
