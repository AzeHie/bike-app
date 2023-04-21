import React, { useState, useEffect } from "react";
import { Pagination } from "@mui/material";

import JourneyList from "../components/Journey/JourneyList";
import Journey from "../shared/models/Journey";
import { useHttpClient } from "../shared/hooks/http-hook";
import LoadingSpinner from "../shared/layout/LoadingSpinner";

const Journeys: React.FC = () => {
  const [loadedJourneys, setLoadedJourneys] = useState<Journey[]>([]);
  const [page, setPage] = useState<number>(0);
  const [numbOfPages, setNumbOfPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<number>(-1);
  const [sortBy, setSortBy] = useState<string>("");
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const changeDuration = (duration: number) => {
    let res = "";
    let minutes = Math.floor(duration / 60);
    let seconds = duration - minutes * 60;

    res += (minutes < 10 ? "0" : "") + minutes + ":" +(seconds < 10 ? "0" : "") + seconds;
    return res;
  };

  const changeDistance = (distance: number) => {
    let res;

    if (!distance) {
      res = "Unavailable";
      return res;
    }
    let temp = distance / 1000;
    res = ((temp * 10) / 10).toFixed(2);

    return res;
  };

  const pageChangeHandler = (newPage: number) => {
    setPage(newPage);
    // triggers useEffect
  };

  const sortHandler = (sortBy: string) => {
    let tempOrder = sortOrder === -1 ? 1 : -1;

    setSortBy(sortBy);
    setSortOrder(tempOrder);
    // triggers useEffect below
  };

  useEffect(() => {
    const fetchJourneys = async () => {
      try {
        let responseData;
        if (!sortOrder || sortBy === "") {
          responseData = await sendRequest(
            `http://localhost:5000/api/journeys/?p=${page}`,
          );
        } else {
          responseData = await sendRequest(
            `http://localhost:5000/api/journeys/?p=${page}&sortby=${sortBy}&sortorder=${sortOrder}`
          );
        }
        let numberOfPages = Math.round(responseData.numbOfPages / 25);
        setNumbOfPages(numberOfPages);

        let tempJourneys: Journey[] = [];

        responseData.journeys.forEach((item: any) => {
          let modifiedDistance = changeDistance(item.CoveredDistanceInMeters);
          let modifiedDuration = changeDuration(item.DurationInSeconds);

          let journey = new Journey(
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
        <JourneyList
          journeys={loadedJourneys}
          page={page}
          numbOfPages={numbOfPages}
          sortHandler={sortHandler}
          pageChangeHandler={pageChangeHandler}
        />
      )}
    </React.Fragment>
  );
};

export default Journeys;
