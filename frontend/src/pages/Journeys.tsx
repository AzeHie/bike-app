import React, { useState, useEffect } from "react";
import JourneyList from "../components/Journey/JourneyList";
import Journey from "../shared/models/Journey";
import { useHttpClient } from "../shared/hooks/http-hook";

const Journeys: React.FC = () => {
  const journeys = [
    new Journey("paska", "paska", "paska", "paska", 1000, 1000),
  ];

  const [loadedJourneys, setLoadedJourneys] = useState<Journey[]>([]);
  const [page, setPage] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchJourneys = async () => {
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
          let journey = new Journey(
            item.Departure,
            item.Return,
            item.DepartureStationName,
            item.ReturnStationName,
            item.CoveredDistanceInMeters,
            item.DurationInSeconds,
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
      <JourneyList journeys={loadedJourneys} />
    </React.Fragment>
  );
};

export default Journeys;
