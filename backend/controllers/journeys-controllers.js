const Journey = require("../models/journey");

const HttpError = require("../models/http-error");

const getJourneys = async (req, res, next) => {
  const sortBy = req.query.sortby;
  const sortOrder = req.query.sortorder;
  const page = req.query.p || 0;
  const itemsPerPage = 25;

  let sort = { [sortBy]: sortOrder };
  let journeys;
  let numbOfPages;
  try {
    if (sortBy && sortOrder) {
      journeys = await Journey.find({})
        .sort(sort)
        .skip(page * itemsPerPage)
        .limit(itemsPerPage);
    } else {
      journeys = await Journey.find()
        .limit(itemsPerPage)
        .skip(page * itemsPerPage);
    }
    numbOfPages = await Journey.countDocuments({}, { hint: "_id_" });

  } catch (err) {
    const error = new HttpError("Could not fetch data, please try again.", 500);
    return next(error);
  }

  res.status(200).json({
    journeys: journeys.map((journey) => journey.toObject({ getters: true })),
    numbOfPages: numbOfPages
  });
};

const addJourney = async (req, res, next) => {
  console.log(req.body);

  // try {
  //   await journey.save();
  // } catch (err) {
  //   const error = new HttpError(
  //     "Could not add journey, please try again.",
  //     500
  //   );
  //   return next(error);
  // }
  res.status(200).json({
    message: "New journey added successfully.",
  });


};

exports.getJourneys = getJourneys;
exports.addJourney = addJourney;
