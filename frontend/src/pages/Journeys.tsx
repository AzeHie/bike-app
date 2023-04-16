import React, { useState, useEffect } from "react";
import JourneyList from "../components/Journey/JourneyList";
import Journey from "../shared/models/Journey";
import { useHttpClient } from "../shared/hooks/http-hook";
import LoadingSpinner from "../shared/layout/LoadingSpinner";
import moment from "moment";

const Journeys: React.FC = () => {
  const [loadedJourneys, setLoadedJourneys] = useState<Journey[]>([]);
  const [page, setPage] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchJourneys = async () => {

      const changeTimeStamp = (timeStamp: string) => {
        let temp = timeStamp.split(/[T]/);
        let tempDate = temp[0].split(/[-]/);
        let newDate = `${tempDate[2]}.${tempDate[1]}.${tempDate[0]}`;
        let newTime = temp[1];

        return`${newDate} at ${newTime}`;
      }

      try {
        let responseData;
        if (sortOrder === "" || sortBy === "") {
          responseData = await sendRequest(
            `http://localhost:5000/api/journeys/?p=${page}`
          );
        } else {
          responseData = await sendRequest(
            `http://localhost:5000/api/journeys/?p=${page}&sortby=${sortBy}&sortOrder=${sortOrder}`
          );
        }
        let tempJourneys: Journey[] = [];

        responseData.journeys.forEach((item: any) => {
          // change timeStamp:
          let modifiedDeparture = changeTimeStamp(item.Departure);
          let modifiedReturn = changeTimeStamp(item.Return);
          
          // change duration:
          let tempDuration = item.DurationInSeconds / 60;
          let modifiedDuration = Math.floor(tempDuration);

          //change distance:
          let tempDistance = item.CoveredDistanceInMeters / 1000;
          let modifiedDistance = (Math.round(tempDistance * 10) / 10).toFixed(1);


          let journey = new Journey(
            modifiedDeparture,
            modifiedReturn,
            item.DepartureStationName,
            item.ReturnStationName,
            modifiedDistance,
            modifiedDuration,
            item.id
          );
          tempJourneys.push(journey);
        });
        setLoadedJourneys(tempJourneys);
      } catch (err: any) {
        // error handling in http-hook, with try-catch just telling to component that stop executing when error occurred
      }
    };
    fetchJourneys();
  }, [sendRequest, page, sortBy, sortOrder]); // sendRequest wrapped with useCallback in http-hook

  return (
    <React.Fragment>
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedJourneys && (
        <JourneyList journeys={loadedJourneys} />
      )}
    </React.Fragment>
  );
};

export default Journeys;
