// a loose hash table:
// keys are [advisorId]-[unformatted timeslot]
// values are objects with advisorId, student, unformatted timeslot,
// and formatted timeslot props

// this would be replaced by a database, or at least a file for simpler data,
// in a real application
const bookedTimesStore = {
  keys: [],
  values: {}
};

module.exports = bookedTimesStore;
