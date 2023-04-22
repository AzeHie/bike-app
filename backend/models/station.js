const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stationSchema = new Schema({
  Nimi: { type: String, required: true },
  Osoite: { type: String, required: true },
  Kaupunki: { type: String, required: true},
  x: { type: Number, required: true },
  y: { type: Number, required: true }
});

module.exports = mongoose.model('Station', stationSchema);