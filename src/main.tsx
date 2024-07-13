import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import DetailPage from "./pages/DetailPage.tsx";
import PageContainer from "./components/PageContaner.tsx";
import "./index.css";
import { ErrorBoundary } from "./components/ErrorBoundary.tsx";
import {
  RouterProvider,
  createBrowserRouter,
  RouteObject,
  LoaderFunctionArgs,
} from "react-router-dom";

const detailLoader = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params;
  const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
};

export const routes: RouteObject[] = [
  {
    path: "react2024",
    element: <App />,
    children: [
      {
        path: "page/:pageId",
        element: <PageContainer />,
        children: [
          {
            path: "detail/:id",
            element: <DetailPage />,
            loader: detailLoader,
          },
        ],
      },
    ],

  },
];

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>
);
