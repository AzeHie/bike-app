import React, { useState, useEffect } from "react";
import StationList from "../../components/Station/StationList";
import Station from "../../shared/models/Station";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/layout/LoadingSpinner";
import ErrorModal from "../../shared/layout/ErrorModal";

const Stations: React.FC = () => {
  const [loadedStations, setLoadedStations] = useState<Station[]>([]);
  const [page, setPage] = useState<number>(0);
  const [numbOfPages, setNumbOfPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<number>(-1);
  const [sortBy, setSortBy] = useState<string>("");
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

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
    const fetchStations = async () => {
      try {
        let responseData;
        if (!sortOrder || sortBy === "") {
          responseData = await sendRequest(
            `http://localhost:5000/api/stations/?p=${page}`
          );
        } else {
          responseData = await sendRequest(
            `http://localhost:5000/api/stations/?p=${page}&sortby=${sortBy}&sortorder=${sortOrder}`
          );
        }

        let numberOfPages = Math.round(responseData.numbOfPages / 25);
        setNumbOfPages(numberOfPages);

        let tempStations: Station[] = [];

        responseData.stations.forEach((item: any) => {
          if (!item.Kaupunki || item.Kaupunki.length < 2) {
            item.Kaupunki = "Unavailable";
          }

          let station = new Station(
            item.id,
            item.Nimi,
            item.Osoite,
            item.Kaupunki,
            item.postalCode,
            item.x,
            item.y
          );

          tempStations.push(station);
        });
        setLoadedStations(tempStations);
      } catch (err: any) {
        // error handling in http-hook
      }
    };
    fetchStations();
  }, [sendRequest, page, sortBy, sortOrder]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedStations && (
        <StationList
          stations={loadedStations}
          page={page}
          numbOfPages={numbOfPages}
          sortHandler={sortHandler}
          pageChangeHandler={pageChangeHandler}
        />
      )}
    </React.Fragment>
  );
};

export default Stations;
