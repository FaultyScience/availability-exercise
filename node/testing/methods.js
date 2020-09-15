const bookedTimesStore = require("../resources/bookedTimesStore");
const inputs = require("./inputs");
const updateBookedTimesStore = require("../resources/updateBookedTimesStore");

// mock booked times
const bookTimes = () => {

  for (let input of inputs.bookedTimeInput) {

    updateBookedTimesStore(input.advisorId, input.student, input.timeslot,
      input.formattedTimeslot);
  }
};

// mock booking a time
const bookTime = idx => {

  const input = inputs.bookedTimeInput[idx];

  updateBookedTimesStore(input.advisorId, input.student, input.timeslot,
    input.formattedTimeslot);
};

// reset booked times
const clearBookedTimesStore = () => {

  bookedTimesStore.keys = [];
  bookedTimesStore.values = {};
};

module.exports = {
  bookTimes: bookTimes,
  bookTime: bookTime,
  clearBookedTimesStore: clearBookedTimesStore
};
