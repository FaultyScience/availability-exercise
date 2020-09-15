const bookedTimesStore = require("./bookedTimesStore");
const utils = require("./utils");

// function to convert raw available times data into a
// sorted hash table of a sort; ignores booked times
const mapAvailableTimes = availabilities => {

  const availableTimes = {
    keys: [],
    values: {}
  };

  const regex = /^.+-[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}-[0-9]{2}:[0-9]{2}$/g;

  for (let date in availabilities) {

    let timeslots = availabilities[date];

    for (let timeslot in timeslots) {

      let advisorId = timeslots[timeslot];
      // key is [advisorId]-[unformatted timeslot]
      let key = advisorId + "-" + timeslot;

      // console.log(key);

      if (key.search(regex) === -1) continue;

      let booked = bookedTimesStore.keys.includes(key);

      if (!booked) {

        // values are objects with advisorId, unformatted timeslot,
        // and formatted timeslot props; we keep the unformatted timeslots
        // because we can sort by those in the key (or elsewhere), but the
        // formatted timeslots are not easily sortable due to
        // 12 hour am/pm format
        let val = {
          advisorId: advisorId,
          timeslot: timeslot,
          formattedTimeslot: utils.formatDateTime(timeslot),
        };

        availableTimes.keys.push(key);
        availableTimes.values[key] = val;
      }
    }
  }

  availableTimes.keys.sort();

  return availableTimes;
};

module.exports = mapAvailableTimes;
