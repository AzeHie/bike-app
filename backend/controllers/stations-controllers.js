const Station = require("../models/station");
const Journey = require("../models/journey");

const HttpError = require("../models/http-error");
const getCoordinates = require("../util/location");

const getStations = async (req, res, next) => {
  const searchTerm = req.query.search;
  const sortBy = req.query.sortby;
  const sortOrder = req.query.sortorder;
  const page = req.query.p || 0;
  const itemsPerPage = 25;


  let sort = { [sortBy]: sortOrder };
  let stations;
  let numbOfPages;
  try {
    if (searchTerm) {
      const query = {"Nimi": {"$regex": searchTerm}};
      stations = await Station.find(query);
    } else if (sortBy && sortOrder) {
      stations = await Station.find({})
        .sort(sort)
        .skip(page * itemsPerPage)
        .limit(itemsPerPage);
    } else {
      stations = await Station.find()
        .limit(itemsPerPage)
        .skip(page * itemsPerPage);
    }
    numbOfPages = await Station.countDocuments({}, { hint: "_id_" });
  } catch (err) {
    const error = new HttpError("Could not fetch data, please try again.", 500);
    return next(error);
  }

  res.status(200).json({
    stations: stations.map((station) => station.toObject({ getters: true })),
    numbOfPages: numbOfPages,
  });
};

const getStationById = async (req, res, next) => {
  const stationId = req.params.sid;
  let station;

  try {
    station = await Station.find({ _id: stationId });

    if (!station) {
      const error = new HttpError("Station not found with specified ID", 404);
    }

  } catch (err) {
    const error = new HttpError("Fetching the station failed!", 500);
    return next(error);
  }

  let modifiedStation;

  modifiedStation = {
    stationId: station[0]._id,
    stationName: station[0].Nimi,
    stationAddress: station[0].Osoite,
    city: station[0].Kaupunki,
    postalCode: station[0].PostalCode,
    x: station[0].x,
    y: station[0].y,
  };

  res.status(200).json({
    station: modifiedStation,
  });
};

const getJourneyDataOfStation = async (req, res, next) => {
  const stationId = req.params.sid;
  let startedJourneysAmount = 0;
  let endedJourneysAmount = 0;
  let startedTotalDistance = 0;
  let endedTotalDistance = 0;
  let startedCount = 0;
  let endedCount = 0;
  let startedAvgInKm = 0;
  let endedAvgInKm = 0;

  try {
    const station = await Station.find({ _id: stationId });
    startedJourneysAmount = await Journey.countDocuments({
      DepartureStationName: station[0].Nimi,
    });
    endedJourneysAmount = await Journey.countDocuments({
      ReturnStationName: station[0].Nimi,
    });
    const startedJourneys = await Journey.find({
      DepartureStationName: station[0].Nimi,
    });
    const endedJourneys = await Journey.find({
      ReturnStationName: station[0].Nimi,
    });

    // calculate total distance and avg distance for both cases:
    startedJourneys.forEach((item) => {
      startedTotalDistance += item.CoveredDistanceInMeters;
      startedCount++;
    });

    if (startedCount > 0) {
      startedAvgInKm = (startedTotalDistance / startedCount / 1000).toFixed(2);
    }

    endedJourneys.forEach((item) => {
      endedTotalDistance += item.CoveredDistanceInMeters;
      endedCount++;
    });

    if (endedCount > 0) {
      endedAvgInKm = (endedTotalDistance / endedCount / 1000).toFixed(2);
    }
  } catch (err) {
    const error = new HttpError(
      "Could not get journey data for this station!",
      500
    );
    return next(error);
  }

  res.status(200).json({
    startedJourneys: startedJourneysAmount,
    endedJourneys: endedJourneysAmount,
    startedAvg: startedAvgInKm,
    endedAvg: endedAvgInKm,
  });
};

const addStation = async (req, res, next) => {
  let station;
  let coordinates;
  let x;
  let y;

  let address =
    req.body.address + ", " + req.body.postalCode + " " + req.body.city;

  try {
    coordinates = await getCoordinates(address);
  } catch (err) {
    return next(err);
  }

  x = coordinates.lng;
  y = coordinates.lat;

  if (req.body.name && req.body.address && req.body.city) {
    station = new Station({
      Nimi: req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1),
      Osoite: req.body.address.charAt(0).toUpperCase() + req.body.address.slice(1),
      Kaupunki: req.body.city.charAt(0).toUpperCase() + req.body.city.slice(1),
      x: x,
      y: y,
    });
  } else {
    const error = new HttpError(
      "Could not add the new station, please check your details and try again!",
      500
    );
    return next(error);
  };
  
  try {
    await station.save();
  } catch (err) {
    const error = new HttpError(
      "Could not add the new station, please check your details and try again!",
      500
    );
    return next(error);
  }

  res.status(200).json({
    message: "New station added successfully.",
  });
};

exports.getStations = getStations;
exports.getStationById = getStationById;
exports.getJourneyDataOfStation = getJourneyDataOfStation;
exports.addStation = addStation;
