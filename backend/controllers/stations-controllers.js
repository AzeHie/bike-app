const Station = require("../models/station");

const HttpError = require("../models/http-error");

const getStations = async (req, res, next) => {
  const sortBy = req.query.sortby;
  const sortOrder = req.query.sortorder;
  const page = req.query.p || 0;
  const itemsPerPage = 25;

  let sort = {[sortBy]: sortOrder };
  let stations;
  let numbOfPages;
  try {
    if (sortBy && sortOrder) {
      stations = await Station.find({}).
      sort(sort)
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
    return next(error)
  }

  res.status(200).json({
    stations: stations.map((station) => station.toObject({ getters: true }))
  })
};

const addStation = async (req, res, next) => {
  const {
    ID,
    Nimi,
    Osoite,
  } = req.body;

  let x = ""
  let y = ""

  const station = new Station({
    ID,
    Nimi,
    Osoite,
    x,
    y
  });

  try {
    await station.save(); 
  } catch (err) {
    const error = new HttpError(
      "Could not add station, please try again.",
      500
    );
    return next(error);
  }
  res.status(200).json({
    message: "New station added successfully."
  });
};

exports.getStations = getStations;
exports.addStation = addStation;