const express = require("express");

const updateBookedTimesStore = require("../resources/updateBookedTimesStore");
const bookedTimesStore = require("../resources/bookedTimesStore");

const router = express.Router();

// endpoint to book a timeslot with an advisor
router.post("/book-time", (req, res) => {

  let status = 200;
  const advisorId = req.body.advisorId;
  const student = req.body.student;
  const timeslot = req.body.timeslot;
  const formattedTimeslot = req.body.formattedTimeslot;
  
  updateBookedTimesStore(advisorId, student, timeslot, formattedTimeslot);

  res.send({
    status: status,
    bookedTimes: bookedTimesStore
  });
});

module.exports = router;
