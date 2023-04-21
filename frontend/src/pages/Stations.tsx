import React from "react";
import StationList from "../components/Station/StationList";
import Station from "../shared/models/Station";

const Stations = () => {
  const stations = [
    new Station(
      "id tähän",
      "Hanasaari",
      "Hanasaarenranta 1",
      "Espoo",
      86600,
      24.840319,
      60.16582
    ),
  ];

  return (
    <React.Fragment>
      <StationList stations={stations} />
    </React.Fragment>
  )
}

export default Stations;