import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "./store/ThemeContext";
import { store } from "./store/Store";

export const AllProviders = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>
    <ThemeProvider>
      <MemoryRouter>{children}</MemoryRouter>
    </ThemeProvider>
  </Provider>
);
