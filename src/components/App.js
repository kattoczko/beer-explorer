import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import BeerListManager from "./BeerListManager";
import BeerDetailsModal from "./BeerDetailsModal";
import "./App.module.scss";

function App() {
  return (
    <div styleName="app">
      <h1 styleName="app-heading">Beer Explorer</h1>
      <Router>
        <Route path="/" component={BeerListManager} />
        <Route path="/details/:id" component={BeerDetailsModal} />
      </Router>
    </div>
  );
}

export default App;
