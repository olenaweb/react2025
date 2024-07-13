import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import DetailPage from "./pages/DetailPage.tsx";
import "./index.css";
import { ErrorBoundary } from "./components/ErrorBoundary.tsx";
import { RouterProvider, createBrowserRouter, RouteObject } from 'react-router-dom';

export const routes: RouteObject[] = [
  {
    path: 'react2024',
    element: <App />,
    children: [
      {
        path: 'page/:pageId',
        element: <App />,
      },
      {
        path: 'detail/:id',
        element: <DetailPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>,
);
