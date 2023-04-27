import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Station from "../../shared/models/Station";
import bikeimg from "../../assets/images/citybiking.jpg";
import Map from "../../shared/layout/Map";
import "./SingleStation.css";
import Modal from "../../shared/layout/Modal";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/layout/ErrorModal";
import LoadingSpinner from "../../shared/layout/LoadingSpinner";

const SingleStation: React.FC<{
  station: Station;
}> = (props) => {
  const navigate = useNavigate();
  const [showMap, setShowMap] = useState<boolean>(false);
  const [startedJourneys, setStartedJourneys] = useState<number>();
  const [endedJourneys, setEndedJourneys] = useState<number>();
  const [startedAvg, setStartedAvg] = useState<number>();
  const [endedAvg, setEndedAvg] = useState<number>();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  useEffect(() => {
    const fetchJourneyData = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/stations/journeydata/${props.station.stationId}`
        );
        setStartedJourneys(responseData.startedJourneys);
        setEndedJourneys(responseData.endedJourneys);
        setStartedAvg(responseData.startedAvg);
        setEndedAvg(responseData.endedAvg);
      } catch (err) {}
    };
    fetchJourneyData();
  }, [sendRequest, props.station.stationId]);

  const backToListHandler = () => {
    navigate("/stations");
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.station.stationAddress}
      >
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
          <div className="started-journeys">
            <div className="journeys-total-item">
              <p>Journeys started from the station:</p>
              {isLoading && <p className="loading">Loading..</p>}
              {!isLoading && (
                <p>
                  <b>{startedJourneys}</b>
                </p>
              )}
            </div>
            <div className="journeys-total-item">
              <p>Average distance of started journeys:</p>
              {isLoading && <p className="loading">Loading..</p>}
              {!isLoading && startedAvg && (
                <p>
                  <b>{startedAvg}km</b>
                </p>
              )}
            </div>
          </div>
          <div className="ended-journeys">
            <div className="journeys-total-item">
              <p>Journeys ended on the station: </p>
              {isLoading && <p className="loading">Loading..</p>}
              {!isLoading && (
                <p>
                  <b>{endedJourneys}</b>
                </p>
              )}
            </div>
            <div className="journeys-total-item">
              <p>Average distance of started journeys:</p>
              {isLoading && <p className="loading">Loading..</p>}
              {!isLoading && endedAvg && (
                <p>
                  <b>{endedAvg}km</b>
                </p>
              )}
            </div>
          </div>
        </div>
        <div>
          <button className="generic-button" onClick={openMapHandler}>
            SHOW ON MAP
          </button>
          <button className="generic-button" onClick={backToListHandler}>
            BACK TO STATION LIST
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SingleStation;
