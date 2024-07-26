import { Link } from "react-router-dom";

export function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to={`/`} role="button">
            <strong>PFASimplu</strong>
          </Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link to={`/registre`}>Registre</Link>
        </li>
        <li>
          <Link to={`/incasari`}>Incasari</Link>
        </li>
        <li>
          <Link to={`/cheltuieli`}>Cheltuieli</Link>
        </li>
        <li>
          <Link to={`/documente`}>Documente</Link>
        </li>
        <li>
          <Link to={`/inventar`}>Inventar</Link>
        </li>
        <li>
          <Link to={`/setari`}>Setari</Link>
        </li>
      </ul>
    </nav>
  );
}
