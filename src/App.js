import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import Dashboard from "./components/layout/Dashboard";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="h-100">
          <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <div className="container-fluid">
              <Link to="/" className="navbar-brand">
                Bloc Chat
              </Link>
            </div>
          </nav>
          <main className="h-100">
            <div className="container-fluid h-100">
              <Switch>
                <Route exact path="/" component={Dashboard} />
              </Switch>
            </div>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
