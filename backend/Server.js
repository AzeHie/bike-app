require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const HttpError = require("./models/http-error");
const journeysRoutes = require("./routes/journeys-routes");
const stationsRoutes = require("./routes/stations-routes");

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // which domains allowed to send requests ('*' == all)
  res.setHeader(
    // which headers incoming request's may have
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE"); // which http-methods allowed for incoming requests
  next();
});

app.use("/api/journeys", journeysRoutes);
app.use("/api/stations", stationsRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw(error); 
});

app.use((error, req, res, next) => { // error handling middleware
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});


mongoose
.connect(
  "mongodb+srv://azehietala:" + process.env.MONGO_ATLAS_PW + "@city-bike.cna0i0r.mongodb.net/bike-app?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database!");
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
