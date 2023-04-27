import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import SingleStation from "../../components/Station/SingleStation";
import Station from "../../shared/models/Station";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/layout/LoadingSpinner";
import ErrorModal from "../../shared/layout/ErrorModal";
import Card from "../../shared/layout/Card";

const StationDetail: React.FC = () => {
  const stationId = useParams().stationId;
  const [loadedStation, setLoadedStation] = useState<Station>();
  const [startedJourneys, setStartedJourneys] = useState<number>(0);
  const [endedJourneys, setEndedJourneys] = useState<number>(0);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchStation = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/stations/${stationId}`
        );
        setLoadedStation(responseData.station);
        setStartedJourneys(responseData.startedJourneys);
        setEndedJourneys(responseData.endedJourneys);
      } catch (err) {}
    };
    fetchStation();

    // const fetchJourneyData = async () => {
    //   try {
    //     const responseData = await sendRequest(
    //       `http://localhost:5000/api/journeys/$`
    //     )
    //   }
    // }
  }, [sendRequest, stationId]);

  return (
    <React.Fragment>
      <div className="station-card-container">
        <Card>
          <ErrorModal error={error} onClear={clearError} />
          {isLoading && (
            <div className="center">
              <LoadingSpinner />
            </div>
          )}
          {!isLoading && loadedStation && (
            <SingleStation
              station={loadedStation}
              startedJourneys={startedJourneys}
              endedJourneys={endedJourneys}
            />
          )}
        </Card>
      </div>
    </React.Fragment>
  );
};

export default StationDetail;
