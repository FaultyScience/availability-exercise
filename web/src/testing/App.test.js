import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import Main from "../containers/Main/Main";

// don't have experience running unit tests on react components, but
// happy to learn if needed :)
// only tested endpoints, and render of entire app
describe("API endpoints", () => {

  test("/today returns today's date", async () => {

    const res = await fetch("http://localhost:4433/today");
    const json = await res.json();

    expect(json.today).toBe(new Date().toLocaleDateString());
  });

  test("/timeslots returns available times and booked times", async () => {

    const res = await fetch("http://localhost:4433/timeslots");
    const json = await res.json();

    expect(json.availableTimes).toBeTruthy();
    expect(json.bookedTimes).toBeTruthy();
  });

  test("/book-time returns booked times", async () => {

    // pass blank data so bookedTimesStore doesn't actually update
    const params = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({})
    };

    const res = await fetch("http://localhost:4433/book-time", params);
    const json = await res.json();

    expect(json.bookedTimes).toBeTruthy();
  });
});

describe("App", () => {

  test("renders without crashing", () => {

    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
