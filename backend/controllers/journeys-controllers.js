const mongoose = require("mongoose");

const getJourneys = async (req, res, next) => {
  console.log("get journeys works"); 
};

const addJourney = async (req, res, next) => {
  console.log("add journey works");
};

exports.getJourneys = getJourneys;
exports.addJourney = addJourney;