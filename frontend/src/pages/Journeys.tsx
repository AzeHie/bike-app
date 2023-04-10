import React from "react";
import JourneysList from "../components/JourneysList";

const Journeys = () => {
  const journeys = [ // hard coded for test
    {
      id: "something",
      depatureTime: "something"
    }
  ];

  return (
    <React.Fragment>
      <JourneysList journeys={journeys} />
    </React.Fragment>
  )
};

export default Journeys;