const express = require("express");
const { check } = require("express-validator");

const stationControllers = require ("../controllers/stations-controllers");
const router = express.Router();

// add validation next
// and information of completed add for the user (frontend)

router.get("/", stationControllers.getStations);

router.get("/:sid", stationControllers.getStationById);

router.post("/add", 
[
  check("name").isLength({min: 3, max: 50}),
  check("address").isLength( {min: 5, max: 50}),
  check("city").isLength({min: 3, max: 50}),
  check("postalCode").not().isEmpty().isNumeric()
], 
stationControllers.addStation);

module.exports = router;