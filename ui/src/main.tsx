import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@picocss/pico/css/pico.css";
import "./pico.colors.min.css";
// https://www.npmjs.com/package/@fontsource/poppins
import "@fontsource/poppins";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/300-italic.css";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Registre } from "./pages/Registre.tsx";
import { Error } from "./pages/Error.tsx";
import { Setari } from "./pages/Setari.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "registre",
        element: <Registre />,
      },
      {
        path: "setari",
        element: <Setari />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
