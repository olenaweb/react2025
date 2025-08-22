import React from "react";
import ReactDOM from "react-dom/client";

// import { Provider } from "react-redux";
import App from "./App.tsx";
import "./index.css";
import UnControledForm from "./components/form/UnControledForm.tsx";
import ControledForm from "./components/form/ControledForm.tsx";
import { ErrorBoundary } from "./components/error/ErrorBoundary.tsx";
import ErrorPage from "./components/error/ErrorPage.tsx";
import { RouterProvider, createBrowserRouter, RouteObject } from "react-router-dom";

const modalRoot = document.getElementById("modal-root") as HTMLElement | null;
if (!modalRoot) {
  throw new Error("Modal root element not found");
}
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App modalRoot={modalRoot} />,
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
    {/* <Provider store={store}> */}
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
    {/* </Provider> */}
  </React.StrictMode>
);
