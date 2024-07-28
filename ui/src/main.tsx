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
import { Error } from "./pages/Error.tsx";
import { Registre } from "./pages/Registre.tsx";
import { Incasari } from "./pages/Incasari.tsx";
import { Cheltuieli } from "./pages/Cheltuieli.tsx";
import { Documente } from "./pages/Documente.tsx";
import { Inventar } from "./pages/Inventar.tsx";
import { Setari } from "./pages/Setari.tsx";



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Registre />,
      },
      {
        path: "registre",
        element: <Registre />,
      },
      {
        path: "incasari",
        element: <Incasari />,
      },
      {
        path: "cheltuieli",
        element: <Cheltuieli />,
      },
      {
        path: "documente",
        element: <Documente />,
      },
      {
        path: "inventar",
        element: <Inventar />,
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
