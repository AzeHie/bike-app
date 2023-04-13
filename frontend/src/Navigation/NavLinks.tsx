import { NavLink } from "react-router-dom";

import "./Navlinks.css";

const NavLinks: React.FC = () => {
  

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/">JOURNEYS</NavLink>
      </li>
      <li>
        <NavLink to="/Stations">STATIONS</NavLink>
      </li>
      <li>
        <NavLink to="/newstation">ADD STATION</NavLink>
      </li>
    </ul>
  )
}

export default NavLinks;