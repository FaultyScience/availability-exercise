import React from "react";

import BookedTimesRows from "./BookedTimesRows";

// component for Booked Times section on main page
const bookedTimes = props => {

  let table = null;

  if (props.timesObj) {

    // show <p> element rather than list of rows if no booked times
    if (props.timesObj.keys.length === 0)
      table = <p style={{ width: "100%", textAlign: "center" }}>No current bookings!</p>;
    else {

      // use BookedTimesRows component to create list of <tr> elements
      table = (

        <table className="bookings table">
          <thead>
            <tr>
              <th>Advisor ID</th>
              <th>Student Name</th>
              <th>Date/Time</th>
            </tr>
          </thead>
          <tbody>
            <BookedTimesRows timesObj={props.timesObj} />
          </tbody>
        </table>
      );
    }
  }

  return (

    <>
      <h2>Booked Times</h2>
      {table}
    </>
  );
};

export default bookedTimes;
