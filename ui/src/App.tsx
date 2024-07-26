import { NavBar } from "./components/NabBar"
import { Outlet } from "react-router-dom"

function App() {
  return (
    <div className="container">
      <NavBar />
      <Outlet/>
    </div>
  );
}

export default App
