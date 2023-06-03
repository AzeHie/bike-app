const journeysControllers = require("../journeys-controllers");
const Journey = require("../../models/journey");

jest.mock("../../models/journey");

describe("getJourneys", () => {
  test("should return status code 200 if request succeeds", async () => {
    const mockedJourneys = [
      { _id: "journey1", CoveredDistanceInMeters: 1500, DurationInSeconds: 500 },
      { _id: "journey2", CoveredDistanceInMeters: 1800, DurationInSeconds: 700 },
    ];

    const mockedCount = 2;
    
    Journey.find = jest.fn().mockResolvedValue(mockedJourneys);
    Journey.countDocuments.mockResolvedValue(mockedCount);


    const req = {
      query: {
        filter: undefined,
        sortBy: undefined,
        sortOrder: undefined,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    await journeysControllers.getJourneys(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});