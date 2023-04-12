import { NavLink } from "react-router-dom";

import "./Navlinks.css";

const NavLinks: React.FC = () => {
  

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/">ALL JOURNEYS</NavLink>
      </li>
      <li>
        <NavLink to="/newjourney">ADD JOURNEY</NavLink>
      </li>
      <li>
        <NavLink to="/Stations">STATIONS</NavLink>
      </li>
    </ul>
  )
}

export default NavLinks;