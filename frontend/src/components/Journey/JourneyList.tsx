import React from "react";
import Journey from "../../shared/models/Journey";

import JourneyItems from "./JourneyItems";
import Card from "../../shared/layout/Card";

// APP.CSS

const JourneyList: React.FC<{ journeys: Journey[] }> = (props) => {
  console.log(props.journeys);

  return (
    <Card>
      <div className="header-line">
        <span>Departure time</span>
        <span>Return time</span>
        <span>Departure station</span>
        <span>Return station</span>
        <span>Covered distance (m)</span>
        <span>Duration (hh:mm)</span>
      </div>
      {props.journeys.map((item) => (
        <JourneyItems
          key={item.id}
          departureTime={item.departureTime}
          returnTime={item.returnTime}
          departureStation={item.departureStation}
          returnStation={item.returnStation}
          coveredDistance={item.coveredDistance}
          duration={item.duration}
        />
      ))}
    </Card>
  );
};

export default JourneyList;
