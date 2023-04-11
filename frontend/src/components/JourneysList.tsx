import React from "react";
import Journey from "../shared/models/Journey";

import classes from "./JourneyList.module.css";
import JourneyItem from "./JourneyItem";

const JourneysList: React.FC<{ journeys: Journey[] }> = (props) => {
  console.log(props.journeys);

  return (
    <React.Fragment>
      <div className={classes.headerLine}>
        <span>Depature time</span>
        <span>Return time</span>
        <span>Depature station</span>
        <span>Return station</span>
        <span>Covered distance (m)</span>
        <span>Duration (hh:mm)</span>
      </div>
      {props.journeys.map((item) => (
        <JourneyItem
          key={item.id}
          depatureTime={item.depatureTime}
          returnTime={item.returnTime}
          depatureStation={item.depatureStation}
          returnStation={item.returnStation}
          coveredDistance={item.coveredDistance}
          duration={item.duration}
        />
      ))}
    </React.Fragment>
  );
};

export default JourneysList;
