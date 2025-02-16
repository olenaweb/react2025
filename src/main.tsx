import React from "react";
import { Outlet } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import DetailPage from "./pages/DetailPage.tsx";
// import PageContainer from "./components/PageContainer.tsx";
import "./index.css";
import { ErrorBoundary } from "./components/ErrorBoundary.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import { RouterProvider, createBrowserRouter, RouteObject } from "react-router-dom";
import { LoaderFunctionArgs } from "react-router-dom";

export const detailLoader = async ({ params }: LoaderFunctionArgs) => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  const { id } = params;
  const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  if (response.status === 404) {
    throw new Error("Not Found");
  }
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
};

export const routes: RouteObject[] = [
  {
    path: "react2025",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "page/:pageId",
        // element: <PageContainer />,
        element: (
          <div className="detail-page">
            <Outlet />
          </div>
        ),
        children: [
          {
            path: "detail/:id",
            element: <DetailPage />, // если нет своего outlet, использует родительский
            loader: detailLoader,
          },
        ],
      },
    ],
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
