import React from "react";

// create list of <tr> elements for available times
const availableTimesRows = props => {

  const values = props.timesObj.values;
  let prevAdvisorId = null;
  let tRows = [];
  let listItems = [];
  let i = 0;
  let j = 0;

  for (let key of props.timesObj.keys) {

    let advisorId = values[key].advisorId;
    let timeslot = values[key].timeslot;
    let formattedTimeslot = values[key].formattedTimeslot;

    // append table row when advisor changes (data is sorted by advisor)
    if (advisorId !== prevAdvisorId) {

      let tr = (

        <tr key={i++}>
          <td>{prevAdvisorId}</td>
          <td>
            <ul className="list-unstyled">
              {listItems}
            </ul>
          </td>
        </tr>
      );

      tRows.push(tr);
      listItems = [];
    }

    let data = {
      advisorId: advisorId,
      timeslot: timeslot,
      formattedTimeslot: formattedTimeslot
    };

    listItems.push((

      <li key={j++}>
        <time dateTime={timeslot} className="book-time">{formattedTimeslot}</time>
        <button className="book btn-small btn-primary" onClick={() =>
            props.onBook(data)}>
            Book
        </button>
      </li>
    ));

    prevAdvisorId = advisorId;
  }

  // append final table row, since only appended when advisor changes within loop
  let tr = (

    <tr key={i++}>
      <td>{prevAdvisorId}</td>
      <td>
        <ul className="list-unstyled">
          {listItems}
        </ul>
      </td>
    </tr>
  );

  tRows.push(tr);

  return tRows;
};

export default availableTimesRows;
