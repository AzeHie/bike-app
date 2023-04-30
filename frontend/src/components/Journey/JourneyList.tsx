import React from "react";
import Tooltip from "@mui/material/Tooltip";
import { FaSort } from "react-icons/fa";
import { Pagination } from "@mui/material";
import { RiFilterLine } from "react-icons/ri";

import Journey from "../../shared/models/Journey";
import JourneyItems from "./JourneyItem";
import Card from "../../shared/layout/Card";

import "./JourneyList.css";

const JourneyList: React.FC<{
  journeys: Journey[];
  page: number;
  numbOfPages: number;
  sortHandler: (sortBy: string) => void;
  pageChangeHandler: (newPage: number) => void;
  filterHandler: (filterTerm: string) => void;
  filterTerm: string;
}> = (props) => {

  const onSortItems = (sortBy: string) => {
    props.sortHandler(sortBy);
  };

  const onPageChange = (e: React.ChangeEvent<unknown>, newPage: number) => {
    props.pageChangeHandler(newPage);
  };

  const onFilter = (filterTerm: string) => {
    props.filterHandler(filterTerm);
  }

  return (
    <Card>
      <div className="journeylist-container">
        <div className="filter">
          <button className="filter-button">
            <span>FILTER</span>
            <div className="filter-button__icon">
              <RiFilterLine />
            </div>
          </button>
          <div className="filter-menu-content">
            <span className="filter-span" onClick={() => onFilter("DIST-UNDER")}>
              <span>Distance</span>
              <span>{"<"}</span>
              <span> 2km</span>{" "}
            </span>
            <span className="filter-span" onClick={() => onFilter("DIST-OVER")}>
              <span>Distance</span>
              <span>{">"} </span>
              <span>2km</span>
            </span>
            <span className="filter-span" onClick={() => onFilter("DURAT-UNDER")}>
              <span>Duration</span>
              <span>{"<"}</span>
              <span>10min</span>{" "}
            </span>
            <span className="filter-span-last" onClick={() => onFilter("DURAT-OVER")}>
              <span>Duration</span>
              <span>{">"}</span>
              <span>10min</span>
            </span>
          </div>
        </div>
        {/* <form className="search-form" onSubmit={onSearch}>
          <input
            ref={searchInputRef}
            className="search-input"
            type="text"
            placeholder="Search by station name.."
          />
          <button className="search-button" type="submit">
            SEARCH
          </button>
        </form>
        {!!props.searchTerm && (
          <div className="search-notification">
            {props.journeys.length > 0 ? (
              <p>Showing results for search of {props.searchTerm}</p>
            ) : (
              <p>No results for search of {props.searchTerm}</p>
            )}
            <button className="search-show-all-button" onClick={resetSearch}>
              SHOW ALL STATIONS
            </button>
          </div>
        )} */}
        <div className="journeys-header-line">
          <span>
            Departure station
            <Tooltip title="Sort by depature station">
              <div
                onClick={() => onSortItems("DepartureStationName")}
                className="sort-icon"
              >
                <FaSort />
              </div>
            </Tooltip>
          </span>
          <span>
            Return station
            <Tooltip title="Sort by return station">
              <div
                onClick={() => onSortItems("ReturnStationName")}
                className="sort-icon"
              >
                <FaSort />
              </div>
            </Tooltip>
          </span>
          <span>
            Distance (km)
            <Tooltip title="Sort by Distance">
              <div
                onClick={() => onSortItems("CoveredDistanceInMeters")}
                className="sort-icon"
              >
                <FaSort />
              </div>
            </Tooltip>
          </span>
          <span>
            Duration (mins)
            <Tooltip title="Sort by Duration">
              <div
                onClick={() => onSortItems("DurationInSeconds")}
                className="sort-icon"
              >
                <FaSort />
              </div>
            </Tooltip>
          </span>
        </div>
        {props.journeys.map((item) => (
          <JourneyItems
            key={item.id}
            departureStation={item.departureStation}
            returnStation={item.returnStation}
            coveredDistance={item.coveredDistance}
            duration={item.duration}
          />
        ))}
        {props.journeys.length < 25 ? (
          <div />
        ) : (
          <div className="pagination">
            <Pagination
              count={props.numbOfPages}
              page={props.page}
              size="large"
              variant="outlined"
              onChange={onPageChange}
            />
          </div>
        )}
      </div>
    </Card>
  );
};

export default JourneyList;
