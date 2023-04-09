const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const journeySchema = new Schema({
  Depature: { type: String, required: true },
  Return: { type: String, required: true },
  DepatureStationId: { type: Number, required: true },
  DepatureStationName: { type: String, required: true},
  ReturnStationId: { type: Number, required: true },
  ReturnStationName: { type: String, required: true },
  CoveredDistanceInMeters: { type: Number, required: true },
  DurationInSeconds: { type: Number, required: true }
});

module.exports = mongoose.model('Journey', journeySchema);