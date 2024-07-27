// test-utils.tsx
import React from "react";
// import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "./store/ThemeContext";
import { store } from "./store/Store";
// import { RenderOptions } from "@testing-library/react";

export const AllProviders = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>
    <ThemeProvider>
      <MemoryRouter>{children}</MemoryRouter>
    </ThemeProvider>
  </Provider>
);
// type Options = RenderOptions<
//   typeof import("@testing-library/dom/types/queries"),
//   HTMLElement,
//   HTMLElement
// >;
// const customRender = (ui: React.ReactElement, options?: Options) =>
//   render(ui, { wrapper: AllProviders, ...options });

// export * from "@testing-library/react";
// export { customRender as render };
