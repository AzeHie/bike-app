import React from "react";
import JourneyList from "../components/Journey/JourneyList";
import Journey from "../shared/models/Journey";

const Journeys = () => {
  const journeys = [
    new Journey(
      "2021-06-30T23:59:36",
      "2021-07-01T00:06:21",
      "Tenholantie",
      "Esterinportti",
      1847,
      100,
      "64319fd119c5e1a5b70c1112"
    ),
    new Journey(
      "2021-06-30T23:59:36",
      "2021-07-01T00:06:21",
      "Joku tie",
      "Esterinportti",
      1500,
      200,
      "64319fd119c5e1a5b70c5678"
    ),
    new Journey(
      "2021-06-30T23:59:36",
      "2021-07-01T00:06:21",
      "Toinen tie",
      "Esterinportti",
      2000,
      900,
      "64319fd119c5e1a5b70c1234"
    )
  ];

  return (
    <React.Fragment>
      <JourneyList journeys={journeys} />
    </React.Fragment>
  );
};

export default Journeys;
