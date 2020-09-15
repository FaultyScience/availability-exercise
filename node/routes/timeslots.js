const express = require("express");
const request = require("request-promise-native");

const c = require("../resources/constants");
const mapAvailableTimes = require("../resources/mapAvailableTimes");
const bookedTimesStore = require("../resources/bookedTimesStore");

const router = express.Router();

// endpoint to fetch timeslots (both available times and booked times)
// from api, and structure them into a usable object to be returned to client
router.get("/timeslots", async (req, res) => {

  let status = 200;
  let availableTimes = null;

  try {

    // would typically use axios or fetch, not request library, but am
    // working under assumption that modules are locked
    const rawAvailableTimes = JSON.parse(await request.get(c.API_URL));

    // available times are mapped into an object with sorted keys of form
    // [advisorId]-[unformatted timeslot], and booked times are excluded
    availableTimes = mapAvailableTimes(rawAvailableTimes);

  } catch (e) {

    // error handling could be more robust here, with cases for each fetch
    // error type, but we'll keep it simple
    if (e.status) status = e.status;
    console.error("Timeslots request failed", e);
  }

  res.send({
    status: status,
    availableTimes: availableTimes,
    bookedTimes: bookedTimesStore
  });
});

module.exports = router;
