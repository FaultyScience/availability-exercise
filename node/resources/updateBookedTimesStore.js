const bookedTimesStore = require("./bookedTimesStore");

// function to add record to bookedTimesStore
const updateBookedTimesStore = (advisorId, student, timeslot,
  formattedTimeslot) => {

    try {

      // would typically throw an Error or something else here,
      // but purposefully sending blank data during a test, and it
      // might appear as an oversight
      if (!advisorId || !timeslot) return;

      // bookedTimesStore follows similar key-value pattern used for availableTimes,
      // with added student prop
      const key = advisorId + "-" + timeslot;

      const val = {
        advisorId: advisorId,
        student: student,
        timeslot: timeslot,
        formattedTimeslot: formattedTimeslot
      };

      // insert key at the beginning of array - we could keep booked times sorted
      // by some scheme, but having most recently booked times at the top is
      // probably better UX
      bookedTimesStore.keys.unshift(key);
      bookedTimesStore.values[key] = val;

    } catch (e) {
      console.error("Adding record to booked times store failed", e);
    }
};

module.exports = updateBookedTimesStore;
