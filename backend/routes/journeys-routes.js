const express = require("express");
const journeyControllers = require("../controllers/journeys-controllers");
const router = express.Router();


router.get("/", journeyControllers.getJourneys);

router.post("/add", journeyControllers.addJourney);

module.exports = router;