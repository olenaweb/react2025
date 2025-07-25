import React from "react";

import ReactDOM from "react-dom/client";
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
    path: "react2025",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "page/:pageId",
        element: <PageContainer />,
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
    path: "react2025/about",
    element: <AboutPage />,
    errorElement: <ErrorPage />,
  },
];

const router = createBrowserRouter(routes);
const rootApp = document.getElementById("root");
if (!rootApp) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(rootApp).render(
  <React.StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>
);
