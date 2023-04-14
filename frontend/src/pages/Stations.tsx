import React from "react";
import StationList from "../components/Station/StationList";
import Station from "../shared/models/Station";

const Stations = () => {
  const stations = [
    new Station(
      501,
      "Hanasaari",
      "Hanasaarenranta 1",
      "Espoo",
      {
        lng: 24.840319,
        lat: 60.16582
      }
    ),
    new Station(
      502,
      "Muu asema",
      "Muu osoite 1",
      "Espoo",
      {
        lng: 24.840319,
        lat: 60.16582
      }
    )
  ]

  return (
    <React.Fragment>
      <StationList stations={stations} />
    </React.Fragment>
  )
}

export default Stations;