import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter, RouteObject } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import UnControledForm from "./components/form/UnControledForm.tsx";
import ControledForm from "./components/form/ControledForm.tsx";
import { ErrorBoundary } from "./components/error/ErrorBoundary.tsx";
import ErrorPage from "./components/error/ErrorPage.tsx";
import "./index.css";
import App from "./App.tsx";
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "control/",
        element: <ControledForm />,
        errorElement: <ErrorPage />,
      },
      {
        path: "uncontrol/",
        element: <UnControledForm />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "/error",
    element: <ErrorPage />,
    errorElement: <ErrorPage />,
  },
  { path: "*", element: <ErrorPage /> },
];

const router = createBrowserRouter(routes);
const rootApp = document.getElementById("root") as HTMLElement | null;
if (!rootApp) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(rootApp).render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>
);
