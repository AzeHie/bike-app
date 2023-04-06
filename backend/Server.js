const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // which domains allowed to send requests ('*' == all)
  res.setHeader( // which headers incoming request's may have
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  ); 
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE"); // which http-methods allowed for incoming requests
  next();
});

app.listen(5000);

console.log("App is running!");