const Journey = require("../models/journey");

const HttpError = require("../models/http-error");

const getJourneys = async (req, res, next) => {
  const filterTerm = req.query.filter;
  const sortBy = req.query.sortby;
  const sortOrder = req.query.sortorder;
  const page = req.query.p || 0;
  const itemsPerPage = 25;

  console.log("filterterm" + filterTerm);

  let sort = { [sortBy]: sortOrder };
  let journeys;
  let numbOfPages;
  let query;
  try {
    if (filterTerm) {
      if (filterTerm === 'DIST-UNDER') {
        query = {"CoveredDistanceInMeters": {$lt: 2000}};
      }
      else if (filterTerm === 'DIST-OVER') {
        query = {"CoveredDistanceInMeters": {$gt: 1999}};
      }
      else if (filterTerm === 'DURAT-UNDER') {
        query = {"DurationInSeconds": {$lt: 600}};
      }
      else if (filterTerm === 'DURAT-OVER') {
        query = {"DurationInSeconds": {$gt: 599}};
      } else {
        query = ({});
      }
    } 
    if (sortBy && sortOrder) {
      journeys = await Journey.find(query)
      .skip(page * itemsPerPage)
      .limit(itemsPerPage)
      .sort(sort);

      numbOfPages = await Journey.countDocuments(query, { hint: "_id_" });
    } else {
      journeys = await Journey.find(query)
        .limit(itemsPerPage)
        .skip(page * itemsPerPage);
      
      numbOfPages = await Journey.countDocuments(query, { hint: "_id_" });
    } 
  } catch (err) {
    console.log(err);
    const error = new HttpError("Could not fetch data, please try again.", 500);
    return next(error);
  }

  res.status(200).json({
    journeys: journeys.map((journey) => journey.toObject({ getters: true })),
    numbOfPages: numbOfPages,
  });
};

const addJourney = async (req, res, next) => {
  if (req.body.departureTime > req.body.returnTime) {
    const error = new HttpError(
      "Departure time can not be after the return time",
      403
    );
    return next(error);
  }

  const journey = new Journey({
    Departure: req.body.departureTime,
    Return: req.body.returnTime,
    DepatureStationName: req.body.departureStation.charAt(0).toUpperCase() + req.body.departureStation.slice(1),
    ReturnStationName: req.body.returnStation.charAt(0).toUpperCase() + req.body.returnStation.slice(1),
    CoveredDistanceInMeters: req.body.distance,
    DurationInSeconds: req.body.duration,
  });

  try {
    await journey.save();
  } catch (err) {
    const error = new HttpError(
      "Could not add journey, please try again.",
      500
    );
    return next(error);
  }

  res.status(200).json({
    message: "New journey added successfully.",
  });
};

exports.getJourneys = getJourneys;
exports.addJourney = addJourney;
