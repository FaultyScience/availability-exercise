import React from "react";

// component for Header section on main page, with date and name input field
const header = props => {

  // simple error component to display if user attempts to book with
  // an empty name field
  const error = (

    <p style={{ position: "absolute", marginLeft: "4px", color: "red" }}>
      Enter your name to book an advisor
    </p>
  );

  // display today's date and show name text input
  // page refresh is prevented on form submission
  return (

    <>
      <h1>Book Time with an Advisor</h1>

      {props.today && <span id="today">Today is {props.today}.</span>}

      <form id="name-form" className="col-md-6" onSubmit={e => e.preventDefault()} >
        <div className="form-group">
          <label htmlFor="name-field">Your Name</label>
          <input type="text" id="name-field" className="form-control" />
          {props.nameError ? error : null}
        </div>
      </form>
    </>
  );
};

export default header;
