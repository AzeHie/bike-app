const Station = require("../models/station");

const HttpError = require("../models/http-error");
const getCoordinates = require("../util/location");

const getStations = async (req, res, next) => {
  const sortBy = req.query.sortby;
  const sortOrder = req.query.sortorder;
  const page = req.query.p || 0;
  const itemsPerPage = 25;

  let sort = { [sortBy]: sortOrder };
  let stations;
  let numbOfPages;
  try {
    if (sortBy && sortOrder) {
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
    numbOfPages: numbOfPages
  });
};

const getStationById = async (req, res, next) => {
  const stationId = req.params.sid;

  let station;
  try {
    station = await Station.find({ _id: stationId });
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
    y: station[0].y
  };

  res.status(200).json({
    station: modifiedStation
  });
};

const addStation = async (req, res, next) => {
  console.log(req.body);
  let coordinates;
  let x;
  let y;

  let address =
    req.body.address +
    ", " +
    req.body.postalCode +
    " " +
    req.body.city;

  try {
    coordinates = await getCoordinates(address);
  } catch (err) {
    return next(err);
  }

  x = coordinates.lng;
  y = coordinates.lat;

  const station = new Station(
    {
      Nimi: req.body.name,
      Osoite: req.body.address,
      Kaupunki: req.body.city,
      x: x,
      y: y
    }
  );

  try {
    await station.save();
  } catch (err) {
    const error = new HttpError("Could not add the new station, please check your details and try again!", 500);
    return next(error);
  }

  res.status(200).json({
    message: "New station added successfully.",
  });
};

exports.getStations = getStations;
exports.getStationById = getStationById;
exports.addStation = addStation;
