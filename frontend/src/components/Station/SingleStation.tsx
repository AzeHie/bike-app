import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Station from "../../shared/models/Station";
import bikeimg from "../../assets/images/citybiking.jpg";
import Map from "../../shared/layout/Map";
import "./SingleStation.css";
import Modal from "../../shared/layout/Modal";

const SingleStation: React.FC<{
  station: Station;
  startedJourneys: number;
  endedJourneys: number;
}> = (props) => {
  const navigate = useNavigate();
  const [showMap, setShowMap] = useState<boolean>(false);

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  const backToListHandler = () => {
    navigate("/stations");
  };

  return (
    <React.Fragment>
      <Modal show={showMap} onCancel={closeMapHandler} header={props.station.stationAddress}>
        <div className="map-container">
          <Map y={props.station.y} x={props.station.x} />
        </div>
      </Modal>
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
          <button className="generic-button" onClick={openMapHandler}>SHOW ON MAP</button>
          <button className="generic-button" onClick={backToListHandler}>
            BACK TO STATION LIST
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SingleStation;
