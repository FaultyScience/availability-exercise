const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const today = require("./routes/today");
const timeslots = require("./routes/timeslots");
const bookTime = require("./routes/bookTime");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// get and post endpoints/routes
app.get("/today", today);
app.get("/timeslots", timeslots);
app.post("/book-time", bookTime);

module.exports = app;
