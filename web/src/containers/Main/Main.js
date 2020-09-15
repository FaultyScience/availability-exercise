import React, { Component } from "react";

import Header from "../../components/Header/Header";
import AvailableTimes from "../../components/AvailableTimes/AvailableTimes";
import BookedTimes from "../../components/BookedTimes/BookedTimes";

// main page container, with Header, AvailableTimes, and BookedTimes components
class Main extends Component {

  constructor(props) {

    super(props);

    // initialize state
    // would typically use redux for centralized state management;
    // without it, just using local state here - manage state in containers,
    // not child components (unless using hooks for local states)
    this.state = {
      today: null,
      availableTimes: null,
      bookedTimes: null,
      nameError: false
    };

    this.fetchToday();
    // fetchTimeslots populates state with both
    // availableTimes and bookedTimes
    this.fetchTimeslots();

    // have to bind this reference manually since not managing state centrally
    this.postBooking = this.postBooking.bind(this);
  }

  // ideally, all logic should be contained in actions in the store files,
  // but we'll let it slide for this small app without a proper store
  // populate state with today's date
  async fetchToday() {

    try {

      const res = await fetch("http://localhost:4433/today");
      const json = await res.json();

      this.setState({ today: json.today });

    } catch (e) {
      console.error("Failed to fetch 'today' data", e);
    }
  }

  // populate state with availableTimes and bookedTimes
  async fetchTimeslots() {

    try {

      const res = await fetch("http://localhost:4433/timeslots");
      const json = await res.json();

      this.setState({
        availableTimes: json.availableTimes,
        bookedTimes: json.bookedTimes
      });

    } catch (e) {
      console.error("Failed to fetch 'timeslots' data", e);
    }
  }

  // post booking to endpoint when user books a timeslot
  async postBooking(data) {

    try {

      const name = document.getElementById("name-field").value;

      // show error and prevent booking if name field is blank
      if (name === "") {

        this.setState({
          nameError: true
        });

        window.scrollTo(0, 0);
        document.getElementById("name-field").focus();

        return;
      }

      // add student to data
      const fullData = {
        ...data,
        student: name
      };

      const params = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fullData)
      };

      const res = await fetch("http://localhost:4433/book-time", params);
      const json = await res.json();

      // this method is called in a child component, so the parent reference
      // is passed to modify state
      const availableTimes = this.state.availableTimes;
      const key = data.advisorId + "-" + data.timeslot;

      // remove booking from available times in state
      // updating state manually this way saves an extra endpoint call,
      // and also avoids potentially bad UX in case the public endpoint
      // data is updated in the meanwhile
      availableTimes.keys.splice(availableTimes.keys.indexOf(key), 1);
      availableTimes.values[key] = undefined;

      this.setState({
        availableTimes: availableTimes,
        bookedTimes: json.bookedTimes,
        nameError: false
      });

      // clear focus
      document.activeElement.blur();

    } catch (e) {
      console.error("Failed to post 'booking' data", e);
    }
  }

  render() {

    // don't show Booked Times before state is populated
    const bookedTimes = this.state.availableTimes ?
      <BookedTimes timesObj={this.state.bookedTimes} /> : null;

    return (

      <>
        <Header today={this.state.today} nameError={this.state.nameError} />
        <AvailableTimes onBook={this.postBooking} timesObj={this.state.availableTimes} />
        {bookedTimes}
      </>
    );
  }
}

export default Main;
