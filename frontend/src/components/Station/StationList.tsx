import React from "react";
import { Tooltip } from "@mui/material";
import { FaSort } from "react-icons/fa";
import { Pagination } from "@mui/material";
import { NavLink } from "react-router-dom";

import Card from "../../shared/layout/Card";
import Station from "../../shared/models/Station";

import "./StationList.css";

const StationList: React.FC<{
  stations: Station[];
  page: number;
  numbOfPages: number;
  sortHandler: (sortBy: string) => void;
  pageChangeHandler: (newPage: number) => void;
}> = (props) => {

  const onSortItems = (sortBy: string) => {
    props.sortHandler(sortBy);
  };

  const onPageChange = (e: React.ChangeEvent<unknown>, newPage: number) => {
    props.pageChangeHandler(newPage);
  };

  return (
    <Card>
      <div className="stationlist-container">
        <div className="stations-header-line">
          <span>
            Station name
            <Tooltip title="Sort by station name">
              <div onClick={() => onSortItems("Nimi")} className="sort-icon">
                <FaSort />
              </div>
            </Tooltip>
          </span>
          <span>
            Address
            <Tooltip title="Sort by station address">
              <div onClick={() => onSortItems("Osoite")} className="sort-icon">
                <FaSort />
              </div>
            </Tooltip>
          </span>
          <span>
            City
            <Tooltip title="Sort by city">
              <div
                onClick={() => onSortItems("Kaupunki")}
                className="sort-icon"
              >
                <FaSort />
              </div>
            </Tooltip>
          </span>
        </div>
        {props.stations.map((item) => (
          <NavLink
            key={item.stationId}
            to={`/stations/${item.stationId}`}
            className="stations-item-line"
          >
            <span>{item.stationName}</span>
            <span>{item.stationAddress}</span>
            <span>{item.city}</span>
          </NavLink>
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

export default StationList;
