import { useNavigate } from "react-router-dom";

import Card from "../../shared/layout/Card";
import Station from "../../shared/models/Station";
import bikeimg from "../../assets/images/citybiking.jpg";

import "./SingleStation.css";


const SingleStation: React.FC<{ station: Station }> = (props) => {
  const navigate = useNavigate();

  // replace image with map later

  const backToListHandler = () => {
    navigate("/stations");
  }
  
  return (
    <div className="station-card-container">
      <Card>
        <div className="station-container">
          <div className="station-details">
            <h1>{props.station.stationName}</h1>
            <p>{props.station.stationAddress}, {props.station.city}</p>
          </div>
          <img className="stationImg" src={bikeimg} alt="single station" />
          <div className="journeys-total">
            <p>Journeys started from the station: 22</p>
            <p>Journeys ended on the station: 33</p>
          </div>
          <div>
            <button className="generic-button" onClick={backToListHandler}>BACK TO STATION LIST</button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SingleStation;
