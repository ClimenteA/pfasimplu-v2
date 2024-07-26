import { NavLink } from "react-router-dom";

export function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to={`/`} role="button">
            <strong>PFASimplu</strong>
          </NavLink>
        </li>
      </ul>
      <ul>
        <li>
          <NavLink
            to={`/registre`}
            className={({ isActive, isPending }) =>
              isPending ? "secondary" : isActive ? "underline" : ""
            }
          >
            Registre
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`/incasari`}
            className={({ isActive, isPending }) =>
              isPending ? "secondary" : isActive ? "underline" : ""
            }
          >
            Incasari
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`/cheltuieli`}
            className={({ isActive, isPending }) =>
              isPending ? "secondary" : isActive ? "underline" : ""
            }
          >
            Cheltuieli
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`/documente`}
            className={({ isActive, isPending }) =>
              isPending ? "secondary" : isActive ? "underline" : ""
            }
          >
            Documente
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`/inventar`}
            className={({ isActive, isPending }) =>
              isPending ? "secondary" : isActive ? "underline" : ""
            }
          >
            Inventar
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`/setari`}
            className={({ isActive, isPending }) =>
              isPending ? "secondary" : isActive ? "underline" : ""
            }
          >
            Setari
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
