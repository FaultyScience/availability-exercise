import React from "react";

import AvailableTimesRows from "./AvailableTimesRows";

// component for Available Times section on main page
const availableTimes = props => {

  let table = null;

  if (props.timesObj) {

    // show <p> element rather than list of rows if no times are available
    if (props.timesObj.keys.length === 0)
      table = <p style={{ width: "100%", textAlign: "center" }}>All advisors are booked!</p>;
    else {

      // use AvailableTimesRows component to create list of <tr> elements
      table = (

        <table className="advisors table">
          <thead>
            <tr>
              <th>Advisor ID</th>
              <th>Available Times</th>
            </tr>
          </thead>
          <tbody>
            <AvailableTimesRows onBook={props.onBook} timesObj={props.timesObj} />
          </tbody>
        </table>
      );
    }
  }

  return (

    <>
      <h2>Available Times</h2>
      {table}
    </>
  );
};

export default availableTimes;
