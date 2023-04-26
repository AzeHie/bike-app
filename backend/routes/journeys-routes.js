const express = require("express");
const { check } = require("express-validator");

const journeyControllers = require("../controllers/journeys-controllers");
const router = express.Router();


router.get("/", journeyControllers.getJourneys);

router.post("/add",
[
  check("departureStation").isLength({min: 3, max: 75}),
  check("departureTime").not().isEmpty(),
  check("returnStation").isLength({min: 3, max: 75}),
  check("returnTime").not().isEmpty(),
  check("distance").not().isEmpty().isNumeric(),
  check("duration").not().isEmpty().isNumeric(),
],
 journeyControllers.addJourney);

module.exports = router;