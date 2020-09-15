const bookedTimesStore = require("../resources/bookedTimesStore");
const mapAvailableTimes = require("../resources/mapAvailableTimes");
const updateBookedTimesStore = require("../resources/updateBookedTimesStore");
const utils = require("../resources/utils");
const inputs = require("./inputs");
const methods = require("./methods");

// would like to use fetch or axios to test actual endpoints, but won't
// install any additional modules here - mocks only

// test today function to return today's date
describe("today", () => {

    test("returns today's formatted date", () => {
      expect(utils.today()).toBe(new Date().toLocaleDateString());
    });
});

// test available times and the mapAvailableTimes function
describe("available times", () => {

  const times = mapAvailableTimes(inputs.dummyData);

  test("are empty if input is empty", () => {

    const emptyTimes = mapAvailableTimes({});

    expect(emptyTimes.keys).toHaveLength(0);
    expect(Object.keys(emptyTimes.values)).toHaveLength(0);
  });

  test("are properly formatted", () => {

    // answer key
    const formattedTimeslots = [
      "4/4/2019 1:00 pm",
      "4/4/2019 11:30 am",
      "4/4/2019 11:00 am",
      "4/5/2019 11:30 am",
      "4/5/2019 4:00 pm",
      "4/5/2019 6:00 pm"
    ];

    for (let i = 0; i < inputs.keys.length; i++)
      expect(times.values[inputs.keys[i]].formattedTimeslot).toBe(formattedTimeslots[i]);
  });

  test("are sorted", () => {

    for (let i = 1; i < inputs.keys.length; i++)
      expect(times.keys[i - 1] < times.keys[i]).toBe(true);
  });

  test("object is correct size if there are no booked times", () => {

    expect(times.keys).toHaveLength(inputs.keys.length);
    expect(Object.keys(times.values)).toHaveLength(inputs.keys.length);
  });

  test("object is correct size if there are three booked times", () => {

    // mock booked times
    methods.bookTimes();

    const availableTimes = mapAvailableTimes(inputs.dummyData);

    expect(availableTimes.keys).toHaveLength(inputs.keys.length - 3);
    expect(Object.keys(availableTimes.values)).toHaveLength(inputs.keys.length - 3);

    // reset booked times
    methods.clearBookedTimesStore();
  });

  test("object has correct keys and values sorted by advisor ID", () => {

    // mock booked times
    methods.bookTimes();

    // answer keys
    const availableKeys = [
      "372955-2019-04-04T11:00:00-04:00",
      "372955-2019-04-04T13:00:00-04:00",
      "417239-2019-04-05T16:00:00-04:00"
    ];

    const availableValues = [

      {
        advisorId: 372955,
        timeslot: "2019-04-04T11:00:00-04:00",
        formattedTimeslot: "4/4/2019 11:00 am"
      },

      {
        advisorId: 372955,
        timeslot: "2019-04-04T13:00:00-04:00",
        formattedTimeslot: "4/4/2019 1:00 pm"
      },

      {
        advisorId: 417239,
        timeslot: "2019-04-05T16:00:00-04:00",
        formattedTimeslot: "4/5/2019 4:00 pm"
      }
    ];

    const availableTimes = mapAvailableTimes(inputs.dummyData);

    for (let i = 0; i < availableTimes.keys.length; i++) {

      let key = availableTimes.keys[i];

      expect(key).toBe(availableKeys[i]);
      expect(availableTimes.values[key].advisorId).toBe(availableValues[i].advisorId);
      expect(availableTimes.values[key].timeslot).toBe(availableValues[i].timeslot);
      expect(availableTimes.values[key].formattedTimeslot).toBe(availableValues[i].formattedTimeslot);
    }

    // reset booked times
    methods.clearBookedTimesStore();
  });
});

// test booked times and the bookedTimesStore object
describe("booking a time", () => {

  const allTimes = mapAvailableTimes(inputs.dummyData);
  const prevBookedTimesStoreKeyLength = bookedTimesStore.keys.length;
  const prevBookedTimesStoreValuesLength = Object.keys(bookedTimesStore.values).length;

  methods.bookTime(0);
  const availableTimes = mapAvailableTimes(inputs.dummyData);

  test("decreases available time size by one", () => {

    expect(allTimes.keys.length - availableTimes.keys.length).toBe(1);
    expect(Object.keys(allTimes.values).length - Object.keys(availableTimes.values).length).toBe(1);
  });

  test("erases record from available times", () => {

    expect(availableTimes.keys.includes("417239-2019-04-05T11:30:00-04:00")).toBe(false);
    expect(availableTimes.values["417239-2019-04-05T11:30:00-04:00"]).toBe(undefined);
  });

  test("increases bookedTimesStore size by one", () => {

    // mock booking a time
    methods.bookTime(0);

    expect(bookedTimesStore.keys.length - prevBookedTimesStoreKeyLength).toBe(1);
    expect(Object.keys(bookedTimesStore.values).length - prevBookedTimesStoreValuesLength).toBe(1);
  });

  test("adds correct record to bookedTimesStore", () => {

    // mock booking a time
    methods.bookTime(0);

    const value = bookedTimesStore.values["417239-2019-04-05T11:30:00-04:00"];

    expect(bookedTimesStore.keys[0]).toBe("417239-2019-04-05T11:30:00-04:00");
    expect(value.advisorId).toBe(417239);
    expect(value.student).toBe("Student A");
    expect(value.timeslot).toBe("2019-04-05T11:30:00-04:00");
    expect(value.formattedTimeslot).toBe("4/5/2019 11:30 am");
  });

  test("inserts new record at front of bookedTimesStore", () => {

    // mock booking times
    methods.bookTime(0);
    methods.bookTime(1);

    expect(bookedTimesStore.keys[0]).toBe("399956-2019-04-04T11:30:00-04:00");
    expect(bookedTimesStore.values["399956-2019-04-04T11:30:00-04:00"]).toBeDefined();
  });

  // reset booked times
  methods.clearBookedTimesStore();
});
