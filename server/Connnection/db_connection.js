require("dotenv").config();
const mongoose = require("mongoose");
const url = process.env.DB_URL;
const dbconnection = mongoose.connect(
  url,
  {
    useNewUrlParser: true,
    dbName: "EV_Station_Finder",
  }).then(
  () => {
    console.log("db has connected");
  }
);
module.exports = dbconnection;