import React, { Component } from "react";

import Main from "./containers/Main/Main";

class App extends Component {

  render() {

    // typically there would be some routing done here, but there is only
    // a single route
    return (

      <div className="App container">
        <Main />
      </div>
    );
  }
}

export default App;
