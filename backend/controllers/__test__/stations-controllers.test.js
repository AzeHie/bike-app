require("dotenv").config();
const stationControllers = require("../stations-controllers");
const mongoose = require("mongoose");

describe("Station controllers", () => {
    beforeEach(async () => {
      await mongoose.connect("mongodb+srv://azehietala:" + process.env.MONGO_ATLAS_PW + "@city-bike.cna0i0r.mongodb.net/bike-app?retryWrites=true&w=majority");
    });

    afterEach(async () => {
      await mongoose.connection.close();
    });

    test("getStationById should return status code 200, if station found", async () => {
      const stationId = "6436e92082b7c2b8388ca24d";
      const req = { params: { sid: stationId } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      await stationControllers.getStationById(req, res, next);
      expect(res.status).toBeCalledWith(200);
    });

  test("getStationById should return (500) error if station not found", async () => {
    const stationId = 1234512345;
    const req = { params: { sid: stationId } };
    const res = {};
    const next = jest.fn();

    await stationControllers.getStationById(req, res, next);
    expect(next).toBeCalledWith(new Error("Fetching the station failed!"));
  });

  test("addStation should return status code 200, if station added", async () => {
    const station = {
      name: "test station",
      address: "Partaperäntie 247",
      postalCode: 86600,
      city: "Haapavesi"
    };

    const req = { 
      body: {
        name: station.name,
        address: station.address,
        postalCode: station.postalCode,
        city: station.city
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    await stationControllers.addStation(req, res, next);
    expect(res.status).toBeCalledWith(200);
  });

  test("addStation should return (422) error if coordinates for specified address not found", async () => {
    const station = {
      name: "test station",
      address: undefined,
      postalCode: 87,
      city: "test city"
    };

    const req = { 
      body: {
        name: station.name,
        address: station.address,
        postalCode: station.postalCode,
        city: station.city
      }
    };
    const res = {};
    const next = jest.fn();

    await stationControllers.addStation(req, res, next);
    expect(next).toBeCalledWith(new Error("Could not find location for that address"));
  })

  test("addStation should return (500) error if adding fails", async () => {
    const station = {
      name: "test station",
      address: undefined,
      postalCode: 86600,
      city: "Haapavesi"
    };

    const req = { 
      body: {
        name: station.name,
        address: station.address,
        postalCode: station.postalCode,
        city: station.city
      }
    };
    const res = {};
    const next = jest.fn();

    await stationControllers.addStation(req, res, next);
    expect(next).toBeCalledWith(new Error("Could not add the new station, please check your details and try again!"));
  });
});