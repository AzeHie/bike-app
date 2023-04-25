const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const journeySchema = new Schema({
  Departure: { type: String, required: true },
  Return: { type: String, required: true },
  DepatureStationName: { type: String, required: true},
  ReturnStationName: { type: String, required: true },
  CoveredDistanceInMeters: { type: Number, required: true },
  DurationInSeconds: { type: Number, required: true }
});

module.exports = mongoose.model('Journey', journeySchema);