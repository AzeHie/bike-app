import { render, screen } from "@testing-library/react";
import JourneyItem from "./JourneyItem";

const journey = {
  departureStation: "Some station",
  returnStation: "Another station",
  coveredDistance: "4.29",
  duration: "10:25",
};

describe("JourneyItem component", () => {
  test("Renders journeyItem correctly", () => {
    render(
      <JourneyItem
        departureStation={journey.departureStation}
        returnStation={journey.returnStation}
        coveredDistance={journey.coveredDistance}
        duration={journey.duration}
      />
    );

    const departureStationElement = screen.getByText(journey.departureStation);
    expect(departureStationElement).toBeInTheDocument();

    const returnStationElement = screen.getByText(journey.returnStation);
    expect(returnStationElement).toBeInTheDocument();

    const distanceElement = screen.getByText(journey.coveredDistance);
    expect(distanceElement).toBeInTheDocument();

    const durationElement = screen.getByText(journey.duration);
    expect(durationElement).toBeInTheDocument();
  });
});
