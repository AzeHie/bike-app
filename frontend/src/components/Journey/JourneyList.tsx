import React from "react";
import { FaSort } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import { Pagination } from "@mui/material";

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
}> = (props) => {
  const onSortItems = (sortBy: string) => {
    props.sortHandler(sortBy);
  };

  const onPageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    props.pageChangeHandler(newPage);
  };

  return (
    <Card>
      <div className="journeylist-container">
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
        <div className="pagination">
          <Pagination
            count={props.numbOfPages}
            page={props.page}
            size="large"
            variant="outlined"
            onChange={onPageChange}
          />
        </div>
      </div>
    </Card>
  );
};

export default JourneyList;
