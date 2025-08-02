import React from "react";

import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/Store.tsx";

// import { useThemeToggle } from "./service/useTheme.tsx";
import { ThemeProvider } from "./service/ThemeProvider.tsx";
// import { useTheme } from "./service/useTheme.tsx";

import App from "./App.tsx";
import AboutPage from "./app-pages/AboutPage";
import DetailPage from "./app-pages/DetailPage";
import PageContainer from "./components/PageContainer";
import "./index.css";
import { ErrorBoundary } from "./components/ErrorBoundary.tsx";
import ErrorPage from "./app-pages/ErrorPage";
import { RouterProvider, createBrowserRouter, RouteObject } from "react-router-dom";
import { getDetailData } from "./request/getDetailData.tsx";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "page/:pageId",
        element: <PageContainer />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "detail/:id",
            element: <DetailPage />,
            loader: getDetailData,
            errorElement: <ErrorPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/about",
    element: <AboutPage />,
    errorElement: <ErrorPage />,
  },
  { path: "*", element: <ErrorPage /> },
];

const router = createBrowserRouter(routes);
const rootApp = document.getElementById("root");
if (!rootApp) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(rootApp).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
