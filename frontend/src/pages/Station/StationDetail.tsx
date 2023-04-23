import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import SingleStation from "../../components/Station/SingleStation";
import Station from "../../shared/models/Station";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/layout/LoadingSpinner";

const StationDetail: React.FC = () => {
  const stationId = useParams().stationId;
  const [loadedStation, setLoadedStation] = useState<any>();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  console.log(stationId);
  console.log("station rendered");

  useEffect(() => {
    const fetchStation = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/stations/${stationId}`
        );
        setLoadedStation(responseData.station);
      } catch (err) {}
    };
    fetchStation();
  }, [sendRequest, stationId]);

  return (
    <React.Fragment>
    {isLoading && (
      <div className="center">
        <LoadingSpinner />
      </div>
    )}
    {!isLoading && loadedStation && <SingleStation station={loadedStation} />};
  </React.Fragment>
  )
};

export default StationDetail;
