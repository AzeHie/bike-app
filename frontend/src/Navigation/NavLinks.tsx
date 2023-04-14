import { NavLink } from "react-router-dom";

import "./Navlinks.css";

const NavLinks: React.FC = () => {
  return (
    <ul className="nav-links-container">
      <div className="nav-links__links">
        <li>
          <NavLink to="/">JOURNEYS</NavLink>
        </li>
        <li>
          <NavLink to="/newjourney">ADD JOURNEY</NavLink>
        </li>
      </div>
      <div className="nav-links__links">
        <li>
          <NavLink to="/Stations">STATIONS</NavLink>
        </li>
        <li>
          <NavLink to="/newstation">ADD STATION</NavLink>
        </li>
      </div>
    </ul>
  );
};

export default NavLinks;
