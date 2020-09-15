// inputs
const dummyData = {

  "2019-04-04": {
      "2019-04-04T13:00:00-04:00": 372955,
      "2019-04-04T11:30:00-04:00": 399956,
      "2019-04-04T11:00:00-04:00": 372955
  },

  "2019-04-05": {
      "2019-04-05T11:30:00-04:00": 417239,
      "2019-04-05T16:00:00-04:00": 417239,
      "2019-04-05T18:00:00-04:00": 417239
  }
};

const keys = [
  "372955-2019-04-04T13:00:00-04:00",
  "399956-2019-04-04T11:30:00-04:00",
  "372955-2019-04-04T11:00:00-04:00",
  "417239-2019-04-05T11:30:00-04:00",
  "417239-2019-04-05T16:00:00-04:00",
  "417239-2019-04-05T18:00:00-04:00"
];

const bookedTimeInput = [

  {
    advisorId: 417239,
    student: "Student A",
    timeslot: "2019-04-05T11:30:00-04:00",
    formattedTimeslot: "4/5/2019 11:30 am"
  },

  {
    advisorId: 399956,
    student: "Student B",
    timeslot: "2019-04-04T11:30:00-04:00",
    formattedTimeslot: "4/5/2019 11:30 am"
  },

  {
    advisorId: 417239,
    student: "Student A",
    timeslot: "2019-04-05T18:00:00-04:00",
    formattedTimeslot: "4/5/2019 6:00 pm"
  }
];

module.exports = {
  dummyData: dummyData,
  keys: keys,
  bookedTimeInput: bookedTimeInput
};
