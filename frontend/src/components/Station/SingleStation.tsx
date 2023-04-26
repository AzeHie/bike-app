import { useNavigate } from "react-router-dom";

import Station from "../../shared/models/Station";
import bikeimg from "../../assets/images/citybiking.jpg";

import "./SingleStation.css";

const SingleStation: React.FC<{
  station: Station;
  startedJourneys: number;
  endedJourneys: number;
}> = (props) => {
  const navigate = useNavigate();

  // replace image with map later

  const backToListHandler = () => {
    navigate("/stations");
  };

  return (
    <div className="station-container">
      <div className="station-details">
        <h1>{props.station.stationName}</h1>
        <p>
          {props.station.stationAddress}, {props.station.city}
        </p>
      </div>
      <img className="stationImg" src={bikeimg} alt="single station" />
      <div className="journeys-total">
        <p>Journeys started from the station: {props.startedJourneys}</p>
        <p>Journeys ended on the station: {props.endedJourneys}</p>
      </div>
      <div>
        <button className="generic-button" onClick={backToListHandler}>
          BACK TO STATION LIST
        </button>
      </div>
    </div>
  );
};

export default SingleStation;
