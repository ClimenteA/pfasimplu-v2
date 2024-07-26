import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '@picocss/pico/css/pico.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Registre } from './pages/Registre.tsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "registre",
        element: <Registre />,
      },
    ],
  },
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
