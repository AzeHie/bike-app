
import { NavLink } from "react-router-dom";
import Card from "../../shared/layout/Card";
import Station from "../../shared/models/Station";

import "./StationList.css";

const StationList: React.FC<{ stations: Station[] }> = (props) => {
  return (
    <Card>
      <div className="stations-header-line"> 
        <span>Station ID</span>
        <span>Station name</span>
        <span>Address</span>
        <span>City</span>
      </div>
      {props.stations.map((item) => (
        <NavLink key={item.stationId} to={`/stations/${item.stationId}`} className="stations-item-line">
          <span>{item.stationId}</span>
          <span>{item.stationName}</span>
          <span>{item.stationAddress}</span>
          <span>{item.city}</span>
        </NavLink>
      ))}
    </Card>
  )
};

export default StationList;
