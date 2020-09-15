import React from "react";

// create list of <tr> elements for booked times
const bookedTimesRows = props => {

  const values = props.timesObj.values;
  let tRows = [];
  let i = 0;

  for (let key of props.timesObj.keys) {

    let advisorId = values[key].advisorId;
    let student = values[key].student;
    let timeslot = values[key].timeslot;
    let formattedTimeslot = values[key].formattedTimeslot;

    let tr = (

      <tr key={i++}>
        <td>{advisorId}</td>
        <td>{student}</td>
        <td>
          <time dateTime={timeslot}>{formattedTimeslot}</time>
        </td>
      </tr>
    );

    tRows.push(tr);
  }

  return tRows;
};

export default bookedTimesRows;
